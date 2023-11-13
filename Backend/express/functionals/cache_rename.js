const fs = require("fs");
const path = require("path");


/**
 * Rename a file in the file cache directory.
 *
 * @param {string} originalFileName - The original file name.
 * @param {string} newFileName - The new file name.
 */
function renameFile(originalFileName, newFileName) {
  // Define the directory where the cache files are stored
  const cacheDir = "./filecache/";

  // Create the full paths for the original and new files
  const originalPath = path.join(cacheDir, originalFileName);
  const newPath = path.join(cacheDir, newFileName);

  // Rename the file using fs.rename
  fs.rename(originalPath, newPath, (err) => {
    if (err) {
      // If an error occurs during the renaming process, log the error
      console.error("Error renaming file:", err);
      return;
    }

    // If successful, log the renaming details
    console.log(`File ${originalFileName} renamed to ${newFileName}`);
  });
}

module.exports = { renameFile };
