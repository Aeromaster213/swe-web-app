const { spawn } = require("child_process")

function callModel(file) {
    const ml = spawn("python", ["-c", `import ml; ml.remote(${file})`])
    var dataOUT;
    ml.stdout.on('data', (data) => {
        dataOUT=data;
    });

    ml.on('close', (code) => {
        if (code){
            console.log("Child died on error "+code);
        }
        return dataOUT;
    })
}

module.exports = { callModel };
