const { spawn } = require("child_process")

function callMultimedia(file, language) {
    return new Promise((resolve, reject) => {
      const ml = spawn("python", ["-c", `from ml import *; remote("filecache/"+"${file}", "${language}")`])
      console.log("Transcription started");
      var dataOUT = '';
  
      ml.stdout.setEncoding("utf-8");
      ml.stdout.on('data', (data) => {
        dataOUT += data.toString();
      });
  
      ml.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });
  
      ml.on('close', (code) => {
        if (code) {
          console.log("Child died on error " + code);
          reject(`Error in transcription: ${code}`);
        } else {
          resolve(dataOUT);
        }
      });
    });
  }
  
function callText(file, language) {
    return new Promise((resolve, reject) => {
      const ml = spawn("python", ["-c", `from ml import *; remote_translate("filecache/"+"${file}", "${language}")`])
      console.log("Transcription started");
      var dataOUT = '';
  
      ml.stdout.setEncoding("utf-8");
      ml.stdout.on('data', (data) => {
        dataOUT += data.toString();
      });
  
      ml.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });
  
      ml.on('close', (code) => {
        if (code) {
          console.log("Child died on error " + code);
          reject(`Error in transcription: ${code}`);
        } else {
          resolve(dataOUT);
        }
      });
    });
  }
  module.exports = { callMultimedia, callText };
  
