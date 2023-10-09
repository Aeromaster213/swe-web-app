const crypto = require('crypto');
const path = require("path");
const fs = require('fs');

function generateFileHash(filePath) {
  console.log('Absolute File Path:', path.resolve(filePath));

  const algorithm = 'sha256';
  const hash = crypto.createHash(algorithm);

  const fileData = fs.readFileSync(filePath);
  hash.update(fileData);

  return hash.digest('hex');
}

const filePath = './samples/gb1.wav'; // Replace with the actual file path
const fileHash = generateFileHash(filePath);

console.log('File Hash:', fileHash);
