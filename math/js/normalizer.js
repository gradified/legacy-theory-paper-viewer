/**
 * Data parser and normalizer module for evaluation JSON payloads.
 * Converts diverse backend payloads into standard report data structures.
 */

/**
 * Safely parses raw JSON or JavaScript object assignment strings.
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
 * Builds evaluation lookup map indexed by question ID.
 * @param {Array} evalArray - Array of evaluation items.
 * @returns {Object} Map of question_id to evaluation item.
 */
function buildEvaluationMap(evalArray) {
  const map = {};
  if (!Array.isArray(evalArray)) return map;
  evalArray.forEach(item => {
    if (item && item.question_id !== undefined) {
      const keyClean = String(item.question_id).trim().replace(/^Q/i, '');
      map[keyClean] = item;
      map[String(item.question_id).trim()] = item;
    }
  });
  return map;
}

/**
 * Normalizes Multiple Choice Questions array.
 */
function normalizeMcqResults(data, evalArray, evalMap) {
  let rawMcqs = data.mcqResults || data.mcq_results || [];
  if (!rawMcqs.length && evalArray.length) {
    rawMcqs = evalArray.filter(item => item.answer_type === "mcq" || item.student_option !== undefined || item.correct_option !== undefined);
  }

  return rawMcqs.map(item => {
    const qidStr = String(item.question_id || "").trim();
    const qidKey = qidStr.replace(/^Q/i, '');
    const evalMatch = evalMap[qidKey] || evalMap[qidStr] || {};

    const studentOpt = item.student_option || evalMatch.student_option || item.student_answer || evalMatch.student_answer || "";
    const correctOpt = item.correct_option || evalMatch.correct_option || item.model_answer || evalMatch.model_answer || "";
    const isCorrect = item.is_correct !== undefined ? Boolean(item.is_correct) : (item.correctness === "correct" || evalMatch.correctness === "correct");

    let cleanOpt = String(studentOpt).trim();
    const match = cleanOpt.match(/^\(?([A-Da-d])\)?[\.\:\s]/);
    if (match) cleanOpt = match[1].toUpperCase();

    return {
      question_id: qidStr || evalMatch.question_id || "MCQ",
      question_text: evalMatch.question_text || item.question_text || "",
      student_option: cleanOpt,
      correct_option: String(correctOpt).trim().toUpperCase(),
      is_correct: isCorrect,
      marks_awarded: item.marks_awarded ?? evalMatch.marks_awarded ?? (isCorrect ? 1 : 0),
      max_marks: item.max_marks ?? evalMatch.max_marks ?? 1,
      confidence: item.confidence ?? evalMatch.confidence ?? null
    };
  });
}

/**
 * Normalizes Subjective/Written answers array.
 */
function normalizeSubjectiveResults(data, evalArray, evalMap) {
  let rawSubs = data.subjectiveResults || data.subjective_results || [];
  if (!rawSubs.length && evalArray.length) {
    rawSubs = evalArray.filter(item => item.answer_type !== "mcq" && (item.question_text || item.steps_analysis || item.feedback));
  }

  return rawSubs.map(item => {
    const qidStr = String(item.question_id || "").trim();
    const qidKey = qidStr.replace(/^Q/i, '');
    const evalMatch = evalMap[qidKey] || evalMap[qidStr] || {};

    const maxMarks = item.max_marks ?? evalMatch.max_marks ?? 1;
    const marksAwarded = item.marks_awarded ?? evalMatch.marks_awarded ?? 0;
    
    let correctness = item.correctness || evalMatch.correctness;
    if (!correctness) {
      if (marksAwarded >= maxMarks) correctness = "correct";
      else if (marksAwarded > 0) correctness = "partially_correct";
      else correctness = "incorrect";
    }

    const steps = item.steps_analysis || evalMatch.steps_analysis || null;
    const feedbackObj = item.feedback || evalMatch.feedback;
    let strengths = item.strengths || (typeof feedbackObj === 'object' && feedbackObj?.strengths ? [feedbackObj.strengths].flat() : []);
    let improvements = item.improvements || (typeof feedbackObj === 'object' && feedbackObj?.improvements ? [feedbackObj.improvements].flat() : []);

    return {
      question_id: qidStr,
      question_text: item.question_text || evalMatch.question_text || `Question ${qidStr}`,
      max_marks: maxMarks,
      marks_awarded: marksAwarded,
      correctness: correctness,
      confidence: item.confidence ?? evalMatch.confidence ?? null,
      student_answer: item.student_answer || evalMatch.student_answer || "",
      rubric_scores: item.rubric_scores || (steps ? steps.map(s => ({ category: s.step || "Step", max_marks: s.marks || 1, awarded_marks: s.is_correct ? (s.marks || 1) : 0 })) : null),
      strengths: strengths,
      improvements: improvements,
      overall_feedback: item.overall_feedback || item.explanation || evalMatch.explanation || (typeof feedbackObj === 'string' ? feedbackObj : ""),
      steps_analysis: steps
    };
  });
}

/**
 * Main normalization function.
 * @param {Object|string} rawPayload - Raw report JSON or object.
 * @returns {Object} Standardized report dataset.
 */
function normalizeReportData(rawPayload) {
  const data = typeof rawPayload === 'string' ? parseReportJSON(rawPayload) : rawPayload;
  if (!data || typeof data !== 'object') throw new Error("Data must be a valid object.");

  const summary = data.summary || data.Summary || {};
  const studentObj = data.student || {};
  const evalArray = Array.isArray(data.evaluation) ? data.evaluation : [];
  const evalMap = buildEvaluationMap(evalArray);

  const mcqResults = normalizeMcqResults(data, evalArray, evalMap);
  const subjectiveResults = normalizeSubjectiveResults(data, evalArray, evalMap);

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
      subject: summary.subject || "Mathematics",
      exam_name: summary.exam_name || "Mathematics Evaluation"
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
