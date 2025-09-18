const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const selectedFile = document.getElementById("selectedFile");
const fileName = document.getElementById("fileName");
const analyzeBtn = document.getElementById("analyzeBtn");

// Click upload area to open file dialog
uploadArea.addEventListener("click", () => fileInput.click());

// Drag & Drop
uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");

    const files = e.dataTransfer.files;
    if (files.length) {
        fileInput.files = files;
        updateFileDisplay(files[0]);
    }
});

// File selected manually
fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
        updateFileDisplay(fileInput.files[0]);
    }
});

// Update file display
function updateFileDisplay(file) {
    fileName.textContent = file.name;
    selectedFile.style.display = "block";
    analyzeBtn.disabled = false;
}

// Analyze button click
analyzeBtn.addEventListener("click", () => {
    if (!fileInput.files.length) return;

    const file = fileInput.files[0];
    alert(`Ready to analyze: ${file.name}`);
    // Here, you can send the file to your backend via fetch/AJAX
});
