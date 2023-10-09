const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");

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

function generateFileHash(filePath) {
  const algorithm = "sha256";
  const hash = crypto.createHash(algorithm);

  const fileData = fs.readFileSync(filePath);
  hash.update(fileData);

  return hash.digest("hex");
}

function handleUpload(req, res) {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(500).send("Error uploading file.");
    }

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
}

module.exports = { handleUpload };
