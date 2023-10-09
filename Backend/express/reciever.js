const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const port = 3000;

// Middleware to parse JSON and handle file uploads
app.use(bodyParser.json());

// Endpoint to handle file uploads
app.post("/api/upload", (req, res) => {
  const uploadedFile = req.body.file; // Assuming the file is sent in the request body

  // Save the uploaded file to a 'cache' directory
  const cacheDir = "./filecache/";
  if (!fs.existsSync(cacheDir)){
    fs.mkdirSync(cacheDir);
  }

  const filePath = `${cacheDir}${uploadedFile.name}`;

  fs.writeFile(filePath, uploadedFile.content, (err) => {
    if (err) {
      return res.status(500).send("Error saving file");
    }

    // Generate hash for the file
    const hash = generateFileHash(filePath);

    // Respond with the hash
    res.json({ hash });
    console.log(hash);
  });
});

function generateFileHash(filePath) {
  const algorithm = "sha256";
  const hash = crypto.createHash(algorithm);

  const fileData = fs.readFileSync(filePath);
  hash.update(fileData);

  return hash.digest("hex");
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
