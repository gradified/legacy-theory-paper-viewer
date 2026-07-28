/**
 * Component Builders for Theory Assessment Report.
 * Renders score dial SVG, rubric bars, step breakdowns, MCQ cells, and question cards.
 */

/**
 * Builds SVG circle progress dial markup.
 * @param {number} percentage - Score percentage (0 to 100).
 * @returns {string} SVG HTML markup string.
 */
function buildScoreDialSvg(percentage) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const boundedPct = Math.min(100, Math.max(0, percentage));
  const strokeOffset = circumference - (boundedPct / 100) * circumference;

  return `
  <svg width="112" height="112" viewBox="0 0 112 112">
    <circle cx="56" cy="56" r="${radius}" fill="none" stroke="var(--line)" stroke-width="10"/>
    <circle cx="56" cy="56" r="${radius}" fill="none" stroke="var(--gold)" stroke-width="10"
      stroke-dasharray="${circumference}" stroke-dashoffset="${strokeOffset}" stroke-linecap="round"/>
  </svg>`;
}

/**
 * Builds categorical rubric score bar visualization.
 * @param {Array} rubricScores - List of rubric items.
 * @returns {string} Rubric bar HTML.
 */
function buildRubricBar(rubricScores) {
  if (!rubricScores || !rubricScores.length) return "";
  
  const barSegments = rubricScores.map(item => {
    const widthPct = (100 / rubricScores.length).toFixed(2);
    const isEarned = item.awarded_marks >= item.max_marks;
    return `<div class="seg ${isEarned ? 'hit' : 'miss'}" style="width:${widthPct}%"></div>`;
  }).join("");

  const labels = rubricScores.map(item =>
    `<span><b>${item.awarded_marks}/${item.max_marks}</b> ${formatMathText(item.category)}</span>`
  ).join("");

  return `<div class="rubric-bar">${barSegments}</div><div class="rubric-labels">${labels}</div>`;
}

/**
 * Builds step-by-step scoring breakdown list matching Math UI.
 * @param {Array} stepsAnalysis - List of evaluated step items.
 * @returns {string} Step breakdown HTML string.
 */
function buildStepsBreakdown(stepsAnalysis) {
  if (!stepsAnalysis || !stepsAnalysis.length) return "";
  
  const stepRows = stepsAnalysis.map(stepItem => {
    const isEarned = stepItem.is_correct;
    const markVal = stepItem.marks !== undefined ? stepItem.marks : (isEarned ? 1 : 0);
    const markLabel = isEarned ? `✓ +${markVal}` : `✕ ${markVal}`;
    return `
    <div class="step-row">
      <span class="step-badge ${isEarned ? 'hit' : 'miss'}">${markLabel}</span>
      <span class="step-text">${formatMathText(stepItem.step)}</span>
    </div>`;
  }).join("");

  return `
  <div class="steps-container">
    <div class="steps-header">Step-by-step scoring</div>
    ${stepRows}
  </div>`;
}

/**
 * Builds Multiple Choice Question grid cell cards with confidence badges.
 * @param {Array} mcqResults - List of normalized MCQ objects.
 * @returns {string} MCQ grid HTML.
 */
function buildMcqGridCells(mcqResults) {
  return mcqResults.map(item => {
    const isCorrect = item.is_correct;
    const hasConfidence = item.confidence !== null && item.confidence !== undefined && item.confidence !== "";
    
    return `
    <div class="mcq-cell ${isCorrect ? 'correct' : 'wrong'}">
      <div class="q">Q${escapeHtml(item.question_id)}</div>
      <div class="opt">${escapeHtml(item.student_option || '—')}</div>
      ${isCorrect ? "" : `<div class="given">correct: ${escapeHtml(item.correct_option || '—')}</div>`}
      ${hasConfidence ? `<div class="mcq-conf ${getConfidenceCssClass(item.confidence)}">Conf: ${formatConfidencePercent(item.confidence)}</div>` : ""}
    </div>`;
  }).join("");
}

/**
 * Builds subjective question evaluation card with confidence badge, step breakdown, strengths, improvements, and key points.
 * @param {Object} question - Normalized question object.
 * @returns {string} Question card HTML string.
 */
function buildQuestionCard(question) {
  const badgeCss = question.correctness || (question.marks_awarded >= question.max_marks ? 'correct' : question.marks_awarded > 0 ? 'partially_correct' : 'incorrect');
  const strengthsList = (question.strengths || []).map(s => `<li>${formatMathText(s)}</li>`).join("") || "<li>—</li>";
  const improvementsList = (question.improvements || []).map(s => `<li>${formatMathText(s)}</li>`).join("") || "<li>—</li>";
  const hasConfidence = question.confidence !== null && question.confidence !== undefined && question.confidence !== "";

  const keyPointsCovered = (question.key_points_covered || []).map(k => `<li>${escapeHtml(k)}</li>`).join("");
  const keyPointsMissing = (question.key_points_missing || []).map(k => `<li>${escapeHtml(k)}</li>`).join("");

  return `
  <div class="qcard">
    <div class="qcard-head">
      <div>
        <span class="qid">Question ${escapeHtml(question.question_id)}</span>
        <h3>${formatMathText(question.question_text)}</h3>
      </div>
      <div class="qcard-badges">
        <div class="marks-badge ${badgeCss}">${question.marks_awarded ?? 0}/${question.max_marks ?? 0} · ${getCorrectnessLabel(question.correctness)}</div>
        ${hasConfidence ? `
          <div class="confidence-badge ${getConfidenceCssClass(question.confidence)}" title="AI Evaluation Confidence Score">
            Confidence: <b>${formatConfidencePercent(question.confidence)}</b>
          </div>
        ` : ""}
      </div>
    </div>

    ${buildRubricBar(question.rubric_scores)}
    ${buildStepsBreakdown(question.steps_analysis)}

    ${question.student_answer ? `
    <details class="answer-toggle" open>
      <summary>Student's Written Answer</summary>
      <div class="student-answer"><b>Student wrote</b>${formatMathText(question.student_answer)}</div>
    </details>` : ""}

    ${(keyPointsCovered || keyPointsMissing) ? `
    <div class="key-points-box" style="margin: 12px 0; padding: 12px; background: #faf8f5; border-radius: 6px; border: 1px solid var(--line); font-size: 13px;">
      ${keyPointsCovered ? `<div style="color: var(--good); margin-bottom: 6px;"><b>Key Points Covered:</b><ul style="margin: 4px 0 8px 18px; padding: 0;">${keyPointsCovered}</ul></div>` : ''}
      ${keyPointsMissing ? `<div style="color: var(--bad);"><b>Key Points Missing:</b><ul style="margin: 4px 0 0 18px; padding: 0;">${keyPointsMissing}</ul></div>` : ''}
    </div>` : ''}

    <div class="two-col">
      <div>
        <div class="col-title good">Strengths</div>
        <ul class="pt-list">${strengthsList}</ul>
      </div>
      <div>
        <div class="col-title bad">To improve</div>
        <ul class="pt-list">${improvementsList}</ul>
      </div>
    </div>

    ${question.overall_feedback ? `<div class="feedback-line">${formatMathText(question.overall_feedback)}</div>` : ''}
  </div>`;
}
