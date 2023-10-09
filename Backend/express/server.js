const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config(); 

// Error handling for incorrect import
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
else{
  console.log("Successfully imported environment variables...");
}

// Initializing variables
const app = express(); // creating instance of express app
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

connection.on("connecting",()=>{
  console.log("Connecting to database...");
})

connection.on("connected",()=>{
  console.log("Connected to database.");
})

connection.on("disconnected",()=>{
  console.log("Disconnected from database.");
})

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Start Server
mongoose.connect(uri).then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});



// Routes
const recordRouter = require("./routes/record");
app.use("/records", recordRouter); // Info route

const testRouter = require("./routes/testroute");
app.use("/test", testRouter); // Test route

const babbleRouter = require("./routes/babbleroute");
app.use("/babble", babbleRouter); // Transcription route

module.exports = {connection};


