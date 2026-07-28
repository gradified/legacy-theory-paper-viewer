/**
 * Theory Evaluation Data Normalizer Module.
 * Parses raw JSON payloads and normalizes evaluation items, student answers, step analysis, and rubrics.
 */

/**
 * Safely parses raw JSON or JS object assignment string.
 * @param {string} rawString - Raw input text.
 * @returns {Object} Parsed JavaScript object.
 */
function parseReportJSON(rawString) {
  if (!rawString || !rawString.trim()) {
    throw new Error("Input string is empty.");
  }
  let cleanStr = rawString.trim()
    .replace(/^(const|let|var)\s+REPORT_DATA\s*=\s*/i, '')
    .replace(/^REPORT_DATA\s*=\s*/i, '')
    .replace(/;\s*$/, '');

  try {
    return JSON.parse(cleanStr);
  } catch (parseError) {
    try {
      const relaxedEvaluator = new Function('return (' + cleanStr + ')');
      const evaluatedObject = relaxedEvaluator();
      if (evaluatedObject && typeof evaluatedObject === 'object') return evaluatedObject;
    } catch (evalError) {
      throw new Error("Syntax Error in JSON: " + parseError.message);
    }
  }
  throw new Error("Invalid JSON structure.");
}

/**
 * Normalizes Multiple Choice Questions list.
 */
function normalizeMcqResults(data) {
  const rawMcqs = data.mcqResults || data.mcq_results || [];
  return rawMcqs.map(item => {
    const qidStr = String(item.question_id || "").trim();
    const studentOpt = item.student_option || item.student_answer || "";
    const correctOpt = item.correct_option || item.model_answer || "";
    const isCorrect = item.is_correct !== undefined ? Boolean(item.is_correct) : item.correctness === "correct";

    let cleanOpt = String(studentOpt).trim();
    const match = cleanOpt.match(/^\(?([A-Da-d])\)?[\.\:\s]?/);
    if (match) cleanOpt = match[1].toUpperCase();

    return {
      question_id: qidStr || "MCQ",
      question_text: item.question_text || `MCQ Question ${qidStr}`,
      student_option: cleanOpt,
      correct_option: String(correctOpt).trim().toUpperCase(),
      is_correct: isCorrect,
      marks_awarded: item.marks_awarded ?? (isCorrect ? 1 : 0),
      max_marks: item.max_marks ?? 1,
      confidence: item.confidence ?? null
    };
  });
}

/**
 * Normalizes Subjective/Written question results and maps student answers & step breakdowns.
 */
function normalizeSubjectiveResults(data) {
  const rawSubs = data.subjectiveResults || data.subjective_results || [];
  const answersMap = data.studentAnswers?.byQuestionId || data.studentAnswers || {};

  return rawSubs.map(item => {
    const qidStr = String(item.question_id || "").trim();
    const qidKey = qidStr.replace(/^Q/i, '');
    const maxMarks = item.max_marks ?? 1;
    const marksAwarded = item.marks_awarded ?? 0;

    let correctness = item.correctness;
    if (!correctness) {
      if (marksAwarded >= maxMarks) correctness = "correct";
      else if (marksAwarded > 0) correctness = "partially_correct";
      else correctness = "incorrect";
    }

    const studentAnswerText = item.student_answer || answersMap[qidKey] || answersMap[qidStr] || "";

    let stepsAnalysis = item.steps_analysis || item.steps || null;
    if (!stepsAnalysis && (item.criteria_met || item.criteria_missed)) {
      stepsAnalysis = [
        ...(item.criteria_met || []).map(c => ({ step: c.criterion || c.text || c, marks: c.marks || 1, is_correct: true })),
        ...(item.criteria_missed || []).map(c => ({ step: c.criterion || c.text || c, marks: c.marks || 0, is_correct: false }))
      ];
    } else if (!stepsAnalysis && item.rubric_scores && Array.isArray(item.rubric_scores)) {
      stepsAnalysis = item.rubric_scores.map(r => ({
        step: r.rationale || r.category || "Evaluation Criteria",
        marks: r.awarded_marks ?? 0,
        max_marks: r.max_marks ?? 1,
        is_correct: (r.awarded_marks ?? 0) >= (r.max_marks ?? 1)
      }));
    }

    return {
      question_id: qidStr,
      question_text: item.question_text || `Question ${qidStr}`,
      max_marks: maxMarks,
      marks_awarded: marksAwarded,
      correctness: correctness,
      confidence: item.confidence ?? null,
      student_answer: studentAnswerText,
      rubric_scores: item.rubric_scores || null,
      steps_analysis: stepsAnalysis,
      strengths: item.strengths || [],
      improvements: item.improvements || [],
      overall_feedback: item.overall_feedback || item.explanation || "",
      key_points_covered: item.key_points_covered || [],
      key_points_missing: item.key_points_missing || []
    };
  });
}

/**
 * Main normalization controller function.
 * @param {Object|string} rawPayload - Raw report JSON or object.
 * @returns {Object} Standardized report dataset.
 */
function normalizeReportData(rawPayload) {
  const data = typeof rawPayload === 'string' ? parseReportJSON(rawPayload) : rawPayload;
  if (!data || typeof data !== 'object') throw new Error("Data must be a valid object.");

  const summary = data.summary || data.Summary || {};
  const studentObj = data.student || {};

  const mcqResults = normalizeMcqResults(data);
  const subjectiveResults = normalizeSubjectiveResults(data);

  const totalQuestions = summary.total_questions || (mcqResults.length + subjectiveResults.length);
  const totalMaxMarks = summary.total_max_marks || (mcqResults.reduce((a, b) => a + b.max_marks, 0) + subjectiveResults.reduce((a, b) => a + b.max_marks, 0));
  const totalAwardedMarks = summary.total_awarded_marks !== undefined ? summary.total_awarded_marks : (mcqResults.reduce((a, b) => a + b.marks_awarded, 0) + subjectiveResults.reduce((a, b) => a + b.marks_awarded, 0));
  const percentage = summary.percentage !== undefined ? summary.percentage : (totalMaxMarks ? Math.round((totalAwardedMarks / totalMaxMarks) * 100 * 100) / 100 : 0);

  return {
    summary: {
      percentage: percentage,
      total_max_marks: totalMaxMarks,
      total_questions: totalQuestions,
      total_awarded_marks: totalAwardedMarks,
      student_name: summary.student_name || studentObj.name || "Student Assessment",
      subject: summary.subject || "Theory Assessment",
      exam_name: summary.exam_name || "Evaluation Report"
    },
    mcqResults: mcqResults,
    subjectiveResults: subjectiveResults,
    subjectiveSummary: data.subjectiveSummary || {
      total_max_marks: subjectiveResults.reduce((a, b) => a + b.max_marks, 0),
      total_awarded_marks: subjectiveResults.reduce((a, b) => a + b.marks_awarded, 0)
    },
    overall_feedback: data.overall_feedback || data.overallFeedback || data.feedback || ""
  };
}
