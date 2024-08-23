// script.js

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const fileLabel = document.getElementById("fileLabel");
  const uploadButton = document.getElementById("uploadButton");

  fileInput.addEventListener("change", function () {
    const fileName =
      fileInput.files.length > 0 ? fileInput.files[0].name : "Choose File";
    fileLabel.textContent = fileName;
  });

  uploadButton.addEventListener("click", function () {
    if (fileInput.files.length === 0) {
      alert("Please choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("apiResult", JSON.stringify(data));
        window.location.href = "/result.html";
      })
      .catch((error) => console.error("Error uploading file:", error));
  });
});
