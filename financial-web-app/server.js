const express = require("express");
const multer = require("multer");
const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// Setting  up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Serve static files (like HTML, CSS, JS) from the "public" directory
app.use(express.static("public"));

// Handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);

  execFile("python", ["model.py", filePath], (error, stdout, stderr) => {
    fs.unlinkSync(filePath); // Clean up uploaded file

    if (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Error processing file" });
    }

    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (parseError) {
      console.error("Parse Error:", parseError);
      res.status(500).json({ error: "Error parsing result" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
