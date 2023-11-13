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


/**
 * Generates a hash for a given file path using the SHA-256 algorithm.
 *
 * @param {string} filePath - The path of the file for which to generate the hash.
 * @returns {string} - The hexadecimal representation of the file hash.
 */
function generateFileHash(filePath) {
  const algorithm = "sha256";
  const hash = crypto.createHash(algorithm);

  const fileData = fs.readFileSync(filePath);
  hash.update(fileData);

  return hash.digest("hex");
}


/**
 * Handles file upload using Multer, generating a hash for the uploaded file,
 * and passing the hash and original file name to a callback function.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} callback - The callback function to handle the hash and original file name.
 */
function handleUpload(req, res, callback) {
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

    // Pass both the hash and the original file name back to the callback function
    if (callback) {
      const originalFileName = req.file.originalname;
      callback(hash, originalFileName);
    }

  });
}

module.exports = { handleUpload };
