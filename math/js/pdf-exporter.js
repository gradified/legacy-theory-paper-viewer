/**
 * PDF Exporter Module for Mathematics Assessment Report.
 * Handles high-quality PDF downloads using html2pdf.js without content clipping or extra blank pages.
 */

/**
 * Computes strict PDF export filename guaranteed to end in `.pdf`.
 * @param {boolean} isMath - Whether current report is Mathematics.
 * @returns {string} Valid PDF filename ending in `.pdf`.
 */
function getReportPdfFilename(isMath) {
  let reportId = currentReportId;
  if (!reportId) {
    const urlParams = new URLSearchParams(window.location.search);
    const hashRaw = window.location.hash ? window.location.hash.replace(/^#+/, '').replace(/^\/+/, '').replace(/^\?+/, '') : "";
    const hashParams = new URLSearchParams(hashRaw);
    reportId = urlParams.get("id") || urlParams.get("reportId") || hashParams.get("id") || hashParams.get("reportId");
    if (!reportId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(hashRaw)) {
      reportId = hashRaw;
    }
  }

  let filename = isMath ? "math-report.pdf" : "theory-report.pdf";
  if (reportId) {
    const cleanId = String(reportId).trim().replace(/\.pdf$/i, "");
    filename = isMath ? `math-${cleanId}.pdf` : `theory-${cleanId}.pdf`;
  }

  if (!filename.toLowerCase().endsWith(".pdf")) {
    filename += ".pdf";
  }

  return filename;
}

/**
 * Exports assessment report container as PDF document without clipping or extra pages.
 */
function downloadPDF() {
  const element = document.getElementById("sheet");
  if (!element) return;

  document.querySelectorAll("details.answer-toggle").forEach(detailEl => {
    detailEl.open = true;
  });

  const filename = getReportPdfFilename(true);
  const originalTitle = document.title;
  document.title = filename;

  showToastMessage("Generating PDF download...");
  window.scrollTo(0, 0);

  if (typeof html2pdf === "function") {
    const pdfOptions = {
      margin: [8, 8, 8, 8],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'], avoid: '.qcard, .note, .masthead, .summary-row' }
    };

    html2pdf().set(pdfOptions).from(element).save(filename).then(() => {
      showToastMessage(`Downloaded ${filename}!`);
      setTimeout(() => { document.title = originalTitle; }, 1000);
    }).catch(err => {
      console.warn("html2pdf error, falling back to print:", err);
      window.print();
      setTimeout(() => { document.title = originalTitle; }, 1000);
    });
  } else {
    window.print();
    setTimeout(() => { document.title = originalTitle; }, 1000);
  }
}
