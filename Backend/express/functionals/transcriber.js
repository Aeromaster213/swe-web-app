// const { spawn } = require("child_process")

// function callModel(file) {
//     const ml = spawn("python", ["-c", `from ml import *; remote("filecache/"+"${file}")`])
//     console.log("Transcription started");
//     var dataOUT;
//     ml.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);
//         dataOUT+=data.toString();
//     });

//     ml.stderr.on('data', (data) => {
//         console.log(`stderr: ${data}`);
//     })

//     ml.on('close', (code) => {
//         if (code){
//             console.log("Child died on error "+code);
//         }
//         return dataOUT;
//     })
// }

// module.exports = { callModel };
function callModel(file) {
    return new Promise((resolve, reject) => {
      const ml = spawn("python", ["-c", `from ml import *; remote("filecache/"+"${file}")`])
      console.log("Transcription started");
      var dataOUT = '';
  
      ml.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
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
  
  module.exports = { callModel };
  