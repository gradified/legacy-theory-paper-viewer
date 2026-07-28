/**
 * Utility functions for HTML escaping, math string formatting,
 * confidence score percentages, and UI feedback toasts.
 */

/**
 * Escapes unsafe HTML characters to prevent XSS injection.
 * @param {any} value - String or object to escape.
 * @returns {string} HTML safe string.
 */
function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/[&<>]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char]));
}

/**
 * Auto-wraps LaTeX math expressions in delimiters for KaTeX rendering.
 * @param {string} text - Plain text containing mathematical symbols.
 * @returns {string} Formatted HTML string ready for KaTeX.
 */
function formatMathText(text) {
  if (!text) return "";
  let safeText = escapeHtml(text);

  safeText = safeText.replace(/(\\(?:frac|sqrt|angle|triangle|square|degree|pi|cdot|times|div|pm|leq|geq|neq|approx|sum|int|infty)(?:\{[^{}]*\}|\s+[a-zA-Z0-9]+)*)/g, function(match) {
    return `\\(${match}\\)`;
  });

  return safeText.replace(/\n/g, '<br>');
}

/**
 * Converts correctness key to user-facing display label.
 * @param {string} status - Correctness status string.
 * @returns {string} Human readable label.
 */
function getCorrectnessLabel(status) {
  const statusLabels = {
    correct: "Correct",
    partially_correct: "Partial",
    incorrect: "Incorrect"
  };
  return statusLabels[status] || status;
}

/**
 * Formats numeric confidence value into percentage string (e.g. "96%").
 * @param {number|string} confidenceValue - Confidence value (0.0 - 1.0 or 0 - 100).
 * @returns {string} Formatted percentage string.
 */
function formatConfidencePercent(confidenceValue) {
  if (confidenceValue === null || confidenceValue === undefined || confidenceValue === "") return "";
  const numericVal = Number(confidenceValue);
  if (isNaN(numericVal)) return escapeHtml(confidenceValue);
  const percentage = Math.round(numericVal <= 1 ? numericVal * 100 : numericVal);
  return percentage + "%";
}

/**
 * Returns color category CSS class based on evaluation confidence.
 * @param {number|string} confidenceValue - Confidence score.
 * @returns {string} CSS class name ('high', 'medium', or 'low').
 */
function getConfidenceCssClass(confidenceValue) {
  if (confidenceValue === null || confidenceValue === undefined || confidenceValue === "") return "";
  const numericVal = Number(confidenceValue);
  if (isNaN(numericVal)) return "";
  const percentage = numericVal <= 1 ? numericVal * 100 : numericVal;
  if (percentage >= 85) return "high";
  if (percentage >= 65) return "medium";
  return "low";
}

/**
 * Displays brief feedback toast notification.
 * @param {string} message - Toast message text.
 */
function showToastMessage(message) {
  const toastElement = document.getElementById("toast");
  if (!toastElement) return;
  toastElement.textContent = message;
  toastElement.classList.add("show");
  setTimeout(() => toastElement.classList.remove("show"), 3000);
}

/**
 * Triggers KaTeX auto-render on the main assessment container.
 */
function renderAllMathFormulas() {
  const container = document.getElementById("sheet");
  if (!container || typeof renderMathInElement !== "function") return;
  
  try {
    renderMathInElement(container, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
      throwOnError: false
    });
  } catch (err) {
    console.warn("KaTeX rendering warning:", err);
  }
}
