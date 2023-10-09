const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000; // You can use any available port

app.use(cors());

function sendToFrontend(data) {
  // Assuming 'data' is an object with 'srt' and 'txt' properties
  app.get("/api/results", (req, res) => {
    res.json(data);
  });

  app.listen(port, () => {
    console.log(`Backpropagation server running on http://localhost:${port}`);
  });
}

module.exports = { sendToFrontend };
