/**
 * Main Entrypoint and State Controller for Theory Assessment Report Viewer.
 * Coordinates rendering, global report state, event listeners, and postMessage integration.
 */

/** @type {Object|null} Currently active report dataset */
let currentReportData = null;

/** @type {string|null} Currently active report UUID */
let currentReportId = null;

/**
 * Calculates average evaluation confidence percentage.
 * @param {Array} mcqResults - MCQ items.
 * @param {Array} subjectiveResults - Written answer items.
 * @returns {number|null} Average confidence percentage.
 */
function calculateAverageConfidence(mcqResults, subjectiveResults) {
  const allItems = [...mcqResults, ...subjectiveResults];
  const validScores = allItems
    .map(item => item.confidence)
    .filter(val => val !== null && val !== undefined && val !== "" && !isNaN(Number(val)));

  if (!validScores.length) return null;
  const sum = validScores.reduce((acc, val) => acc + (Number(val) <= 1 ? Number(val) * 100 : Number(val)), 0);
  return Math.round(sum / validScores.length);
}

/**
 * Renders complete Theory Assessment Report view into the sheet container.
 * @param {Object|string} rawReportData - Raw or normalized report data.
 */
function renderReport(rawReportData) {
  const normalizedData = normalizeReportData(rawReportData);
  currentReportData = normalizedData;

  const summary = normalizedData.summary || {};
  const mcqList = normalizedData.mcqResults || [];
  const subList = normalizedData.subjectiveResults || [];
  const subSummary = normalizedData.subjectiveSummary || {};

  const percentage = summary.percentage ?? (summary.total_max_marks ? Math.round((summary.total_awarded_marks / summary.total_max_marks) * 100) : 0);
  const avgConfidence = calculateAverageConfidence(mcqList, subList);

  const studentMetaText = [
    summary.student_name ? `Student: ${escapeHtml(summary.student_name)}` : null,
    summary.subject ? `Subject: ${escapeHtml(summary.subject)}` : null,
    summary.exam_name ? `Exam: ${escapeHtml(summary.exam_name)}` : null,
    `Total questions: ${summary.total_questions ?? (mcqList.length + subList.length)}`
  ].filter(Boolean).join(" • ");

  const reportHtml = `
    <div class="masthead">
      <div class="masthead-top">
        <div class="brand-container">
          <img src="logo_g.png" alt="Gradified Logo" class="brand-logo" onerror="this.onerror=function(){this.style.display='none'; document.getElementById('brandFallback').style.display='inline';};">
          <span id="brandFallback" style="display:none; font-weight:bold; font-size:20px; color:var(--navy);">[G]</span>
          <div class="brand-text">
            <span class="powered-by">Powered by</span>
            <span class="brand-name">Gradified</span>
          </div>
        </div>
        <div class="meta">
          <div>${studentMetaText}</div>
          <div>Generated for review &amp; sharing</div>
        </div>
      </div>
      <div class="masthead-main">
        <div>
          <div class="eyebrow">Evaluated Answer Sheet</div>
          <h1>Assessment Report</h1>
        </div>
      </div>
    </div>

    <div class="summary-row">
      <div class="dial-wrap">
        ${buildScoreDialSvg(percentage)}
        <div class="dial-pct"><b>${percentage}%</b><span>Overall</span></div>
      </div>
      <div class="stat-grid" style="${avgConfidence !== null ? 'grid-template-columns: repeat(4, 1fr);' : ''}">
        <div class="stat"><div class="num">${summary.total_awarded_marks ?? "—"} / ${summary.total_max_marks ?? "—"}</div><div class="lbl">Marks awarded</div></div>
        <div class="stat"><div class="num">${mcqList.length}</div><div class="lbl">MCQs attempted</div></div>
        <div class="stat"><div class="num">${subList.length}</div><div class="lbl">Written answers</div></div>
        ${avgConfidence !== null ? `<div class="stat"><div class="num">${avgConfidence}%</div><div class="lbl">Avg. Confidence</div></div>` : ""}
      </div>
    </div>

    ${normalizedData.overall_feedback ? `
    <div class="note">
      <div class="eyebrow">Teacher's note</div>
      ${normalizedData.overall_feedback.split(/\n\n+/).map(para => `<p>${formatMathText(para)}</p>`).join("")}
    </div>` : ""}

    ${mcqList.length ? `
    <section>
      <div class="section-title">Multiple Choice Questions <span class="tally">${mcqList.filter(item => item.is_correct).length}/${mcqList.length} correct</span></div>
      <div class="mcq-grid">${buildMcqGridCells(mcqList)}</div>
    </section>` : ""}

    ${subList.length ? `
    <section>
      <div class="section-title">Written Answers <span class="tally">${subSummary.total_awarded_marks ?? ""}/${subSummary.total_max_marks ?? ""} marks</span></div>
      ${subList.map(q => buildQuestionCard(q)).join("")}
    </section>` : ""}

    <footer>Report generated automatically from evaluation data • Powered by Gradified</footer>
  `;

  document.getElementById("sheet").innerHTML = reportHtml;
  renderAllMathFormulas();
}

/** Programmatically loads report data from external callers. */
window.loadReportData = function(jsonOrObj) {
  try {
    const parsedData = typeof jsonOrObj === 'string' ? parseReportJSON(jsonOrObj) : jsonOrObj;
    renderReport(parsedData);
    saveToLocalStorage(parsedData);
    updateStatusTag("Programmatically Loaded");
    showToastMessage("Report loaded via application!");
  } catch (err) {
    console.error("Failed to load report data:", err);
  }
};

window.addEventListener("message", event => {
  if (event.data && (event.data.type === "LOAD_REPORT_DATA" || event.data.REPORT_DATA)) {
    const payload = event.data.REPORT_DATA || event.data.data;
    if (payload) window.loadReportData(payload);
  }
});

window.addEventListener("dragover", e => e.preventDefault());
window.addEventListener("drop", e => {
  e.preventDefault();
  if (e.dataTransfer.files && e.dataTransfer.files.length) {
    const file = e.dataTransfer.files[0];
    if (file.name.endsWith(".json") || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = ev => window.loadReportData(ev.target.result);
      reader.readAsText(file);
    }
  }
});

window.addEventListener("hashchange", () => processUrlParameters());

window.addEventListener("DOMContentLoaded", () => {
  if (window.opener) {
    try { window.opener.postMessage({ type: "REPORT_VIEWER_READY" }, "*"); } catch(e) {}
  }

  window.addEventListener("beforeprint", () => {
    document.querySelectorAll("details.answer-toggle").forEach(el => el.open = true);
  });

  if (!processUrlParameters()) {
    if (!loadFromLocalStorage()) {
      renderReport(DEMO_REPORT_DATA);
    }
  }
});
