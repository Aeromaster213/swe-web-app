const express = require("express");
const cors = require("cors");
const app = express();
var isCreated = false;
const backport = 5001;

app.use(cors());

let server; // Define a variable to hold the server instance

function sendToFrontend(data) {
  if (!server) {
    server = app.listen(backport, () => {
      console.log(`Backpropagation server running on http://localhost:${backport}`);
    });
  }

  app.get("/api/results", (req, res) => {
    res.json(data);
    // Close the server after sending the data
    server.close(() => {
      console.log(`Backpropagation server closed`);
      server = null; // Reset the server variable
    });
  });
}

// function sendToFrontend(data) {
//   // Assuming 'data' is an object with 'srt' and 'txt' properties
//   app.get("/api/results", (req, res) => {
//     res.json(data);
//   });

//   if (isCreated==false)
//   {
//     app.listen(backport, () => {
//       console.log(`Backpropagation server running on http://localhost:${backport}`);
//     });
//     isCreated = true;
//   }
  

// }

module.exports = { sendToFrontend };
