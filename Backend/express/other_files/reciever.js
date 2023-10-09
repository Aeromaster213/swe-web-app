// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");
// const crypto = require("crypto");

// const app = express();
// const port = 5000;

// // Middleware to parse JSON and handle file uploads
// app.use(cors());
// app.use(bodyParser.json());

// // Endpoint to handle file uploads
// app.post("/api/upload", (req, res) => {
//   const uploadedFile = req.body.file; // Assuming the file is sent in the request body

//   // Save the uploaded file to a 'cache' directory
//   const cacheDir = "./filecache/";
//   if (!fs.existsSync(cacheDir)){
//     fs.mkdirSync(cacheDir);
//   }

//   const filePath = `${cacheDir}${uploadedFile.name}`;

//   fs.writeFile(filePath, uploadedFile.content, (err) => {
//     if (err) {
//       return res.status(500).send("Error saving file");
//     }

//     // Generate hash for the file
//     const hash = generateFileHash(filePath);

//     // Respond with the hash
//     res.json({ hash });
//     console.log(hash);
//   });
// });

// function generateFileHash(filePath) {
//   const algorithm = "sha256";
//   const hash = crypto.createHash(algorithm);

//   const fileData = fs.readFileSync(filePath);
//   hash.update(fileData);

//   return hash.digest("hex");
// }

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


const express = require("express");
const cors = require("cors");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");

const app = express();
const port = 5000;

// Middleware to enable CORS and parse JSON
app.use(cors());
app.use(express.json());

// Define a storage location for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const cacheDir = "./filecache/";
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }
    cb(null, cacheDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create a Multer instance with the defined storage
const upload = multer({ storage });

// Endpoint to handle file uploads using Multer
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;

  // Generate hash for the file
  const hash = generateFileHash(filePath);

  // Respond with the hash
  res.json({ hash });
  console.log(hash);
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
