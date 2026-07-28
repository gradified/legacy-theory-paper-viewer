/**
 * API Loader and URL Parameter Processor Module.
 * Fetches remote reports by ID and parses URL query / hash parameters.
 */

/**
 * Decodes Base64 UTF-8 encoded string.
 * @param {string} encodedString - Base64 encoded string.
 * @returns {string} Decoded plain text string.
 */
function decodeBase64Utf8(encodedString) {
  try {
    const bytes = Uint8Array.from(atob(encodedString), char => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch (err) {
    return atob(encodedString);
  }
}

/**
 * Fetches report JSON payload by report UUID from remote Gradified API.
 * @param {string} reportId - Unique report identifier.
 * @param {string} [apiHostOverride] - Optional custom API host.
 */
function fetchReportById(reportId, apiHostOverride) {
  if (!reportId || !reportId.trim()) return;
  const cleanId = reportId.trim();
  currentReportId = cleanId;

  const urlParams = new URLSearchParams(window.location.search);
  const apiHost = apiHostOverride || urlParams.get("apiHost") || "https://api.gradified.in";
  const apiUrl = `${apiHost}/api/v1/report/${encodeURIComponent(cleanId)}`;

  updateStatusTag(`Loading Report #${cleanId.substring(0, 8)}...`);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error("API returned HTTP status " + response.status);
      return response.json();
    })
    .then(data => {
      window.loadReportData(data);
      updateStatusTag(`Report #${cleanId.substring(0, 8)}`);
      showToastMessage("Report loaded!");
    })
    .catch(err => {
      console.error("Error fetching report ID:", err);
      updateStatusTag("Fetch error");
      alert("Could not load report ID " + cleanId + ": " + err.message);
    });
}

/**
 * Processes URL query strings and hash parameters for report IDs, Base64 data, or remote URLs.
 * @returns {boolean} True if a report parameter was recognized and loaded.
 */
function processUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const hashRaw = window.location.hash ? window.location.hash.replace(/^#+/, '').replace(/^\/+/, '').replace(/^\?+/, '') : "";
  const hashParams = new URLSearchParams(hashRaw);

  const base64Param = urlParams.get("b64") || urlParams.get("base64") || hashParams.get("b64") || hashParams.get("base64");
  const jsonParam = urlParams.get("data") || urlParams.get("json") || hashParams.get("data") || hashParams.get("json");
  const fetchUrlParam = urlParams.get("url") || urlParams.get("src") || urlParams.get("fetch") || hashParams.get("url");

  let reportId = urlParams.get("id") || urlParams.get("reportId") || hashParams.get("id") || hashParams.get("reportId");
  if (!reportId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(hashRaw)) {
    reportId = hashRaw;
  }

  if (reportId) {
    fetchReportById(reportId);
    return true;
  }

  if (fetchUrlParam) {
    updateStatusTag("Fetching remote JSON...");
    fetch(fetchUrlParam)
      .then(res => res.json())
      .then(data => window.loadReportData(data))
      .catch(err => console.error("Remote fetch error:", err));
    return true;
  }

  if (base64Param) {
    try {
      window.loadReportData(decodeBase64Utf8(base64Param));
      return true;
    } catch (err) {
      console.error("Base64 parameter parse error:", err);
    }
  }

  if (jsonParam) {
    try {
      window.loadReportData(decodeURIComponent(jsonParam));
      return true;
    } catch (err) {
      console.error("JSON parameter parse error:", err);
    }
  }

  return false;
}
