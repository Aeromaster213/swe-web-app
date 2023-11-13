const { spawn } = require("child_process")


/**
 * Calls the multimedia transcription process using a Python script.
 *
 * @param {string} file - The file name for transcription.
 * @param {string} language - The language for transcription.
 * @returns {Promise<string>} - A promise that resolves with the transcription data.
 */
function callMultimedia(file, language) {
    return new Promise((resolve, reject) => {
      // Spawn a new Python process for multimedia transcription
      const ml = spawn("python", ["-c", `from ml import *; remote("filecache/"+"${file}", "${language}")`])

      // Log a message when transcription starts
      console.log("Transcription started");

      // Variable to store the output data
      var dataOUT = '';

      // Set the encoding for stdout
      ml.stdout.setEncoding("utf-8");

      // Event listener for data received on stdout
      ml.stdout.on('data', (data) => {
        dataOUT += data.toString();
      });
      
      // Event listener for data received on stderr (error stream)
      ml.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });
  
      // Event listener for when the process closes
      ml.on('close', (code) => {
        if (code) {
          // If the process closes with an error, reject the promise
          console.log("Child died on error " + code);
          reject(`Error in transcription: ${code}`);
        } else {
          // If the process closes successfully, resolve the promise
          resolve(dataOUT);
        }
      });
    });
  }
  

/**
 * Calls the text transcription process using a Python script.
 *
 * @param {string} file - The file name for transcription.
 * @param {string} language - The language for transcription.
 * @returns {Promise<string>} - A promise that resolves with the transcription data.
 */  
function callText(file, language) {
    return new Promise((resolve, reject) => {
      // Spawn a new Python process for text transcription
      const ml = spawn("python", ["-c", `from ml import *; remote_translate("filecache/"+"${file}", "${language}")`])

      // Log a message when transcription starts
      console.log("Transcription started");

      // Variable to store the output data
      var dataOUT = '';
      
      // Set the encoding for stdout
      ml.stdout.setEncoding("utf-8");

      // Event listener for data received on stdout
      ml.stdout.on('data', (data) => {
        dataOUT += data.toString();
      });
      
      // Event listener for data received on stderr (error stream)
      ml.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });
      
      // Event listener for when the process closes
      ml.on('close', (code) => {
        if (code) {
          // If the process closes with an error, reject the promise
          console.log("Child died on error " + code);
          reject(`Error in transcription: ${code}`);
        } else {
          // If the process closes successfully, resolve the promise
          resolve(dataOUT);
        }
      });
    });
  }
  module.exports = { callMultimedia, callText };
  
