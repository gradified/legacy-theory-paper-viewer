/**
 * Storage and Modal Controller for Theory Assessment Report.
 * Handles modal dialogs, JSON importing, local file upload, and browser LocalStorage.
 */

/** Opens the paste JSON import modal. */
function openJsonModal() {
  const modalElement = document.getElementById("jsonModal");
  const textareaElement = document.getElementById("jsonTextArea");
  const errorBanner = document.getElementById("jsonError");
  if (!modalElement || !textareaElement) return;

  if (errorBanner) errorBanner.style.display = "none";
  textareaElement.value = JSON.stringify(currentReportData || DEMO_REPORT_DATA, null, 2);
  modalElement.classList.add("active");
  textareaElement.focus();
}

/** Closes the paste JSON import modal. */
function closeJsonModal() {
  const modalElement = document.getElementById("jsonModal");
  if (modalElement) modalElement.classList.remove("active");
}

/** Handles modal backdrop click dismiss. */
function handleModalBackdropClick(event) {
  if (event.target.id === "jsonModal") closeJsonModal();
}

/** Applies user JSON from modal textarea. */
function applyJsonFromModal() {
  const textareaElement = document.getElementById("jsonTextArea");
  const errorBanner = document.getElementById("jsonError");
  if (errorBanner) errorBanner.style.display = "none";

  try {
    const parsedData = parseReportJSON(textareaElement.value);
    renderReport(parsedData);
    saveToLocalStorage(parsedData);
    updateStatusTag("Custom JSON Loaded");
    closeJsonModal();
    showToastMessage("Report updated successfully!");
  } catch (err) {
    if (errorBanner) {
      errorBanner.textContent = "Error: " + err.message;
      errorBanner.style.display = "block";
    }
  }
}

/** Loads demo sample JSON into modal textarea. */
function loadSampleIntoModal() {
  const textareaElement = document.getElementById("jsonTextArea");
  const errorBanner = document.getElementById("jsonError");
  if (textareaElement) textareaElement.value = JSON.stringify(DEMO_REPORT_DATA, null, 2);
  if (errorBanner) errorBanner.style.display = "none";
}

/** Handles local file upload event. */
function handleFileUpload(event) {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsedData = parseReportJSON(e.target.result);
      renderReport(parsedData);
      saveToLocalStorage(parsedData);
      updateStatusTag(`File: ${selectedFile.name}`);
      showToastMessage(`Loaded ${selectedFile.name}!`);
    } catch (err) {
      alert("Could not load file: " + err.message);
    }
  };
  reader.readAsText(selectedFile);
}

/** Programmatically triggers hidden file input click. */
function triggerFileInput() {
  const fileInput = document.getElementById("fileInput");
  if (fileInput) fileInput.click();
}

/** Updates top header status tag text. */
function updateStatusTag(text) {
  const statusElement = document.getElementById("statusText");
  if (statusElement) statusElement.textContent = text;
}

/** Saves report data to browser LocalStorage. */
function saveToLocalStorage(data) {
  try {
    localStorage.setItem("GRADIFIED_THEORY_SAVED_REPORT", JSON.stringify(data));
  } catch (err) {
    console.warn("Could not save to LocalStorage:", err);
  }
}

/** Loads report data from browser LocalStorage if present. */
function loadFromLocalStorage() {
  try {
    const savedString = localStorage.getItem("GRADIFIED_THEORY_SAVED_REPORT");
    if (savedString) {
      const parsedData = JSON.parse(savedString);
      renderReport(parsedData);
      updateStatusTag("Saved Local Report");
      return true;
    }
  } catch (err) {
    console.warn("Could not load from LocalStorage:", err);
  }
  return false;
}
