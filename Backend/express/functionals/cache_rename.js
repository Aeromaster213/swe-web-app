const fs = require("fs");
const path = require("path");

function renameFile(originalFileName, newFileName) {
  const cacheDir = "./filecache/";

  const originalPath = path.join(cacheDir, originalFileName);
  const newPath = path.join(cacheDir, newFileName);

  fs.rename(originalPath, newPath, (err) => {
    if (err) {
      console.error("Error renaming file:", err);
      return;
    }

    console.log(`File ${originalFileName} renamed to ${newFileName}`);
  });
}

module.exports = { renameFile };
