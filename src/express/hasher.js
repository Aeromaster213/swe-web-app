const crypto = require('crypto');
const fs = require('fs');

function generateFileHash(filePath) {
  const algorithm = 'sha256';
  const hash = crypto.createHash(algorithm);

  const fileData = fs.readFileSync(filePath);
  hash.update(fileData);

  return hash.digest('hex');
}

const filePath = 'path/to/your/file'; // Replace with the actual file path
const fileHash = generateFileHash(filePath);

console.log('File Hash:', fileHash);
