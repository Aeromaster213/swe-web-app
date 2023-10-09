const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

function sendToFrontend(data) {
  // Assuming 'data' is an object with 'srt' and 'txt' properties
  app.get("/api/results", (req, res) => {
    res.json(data);
  });

}

module.exports = { sendToFrontend };
