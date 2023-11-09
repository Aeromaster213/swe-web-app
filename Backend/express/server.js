const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs-extra");

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
//const backport = process.env.BACKPORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
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


// Import the uploader and renaming module
const uploader = require('./functionals/uploader');
const cacheRename = require('./functionals/cache_rename');

// Import the transcriber module
const transcriber = require('./functionals/transcriber'); 

// Import the Babble model
const Babble = require("./models/babbleModel");


// Routes
const recordRouter = require("./routes/record");
app.use("/records", recordRouter); // Info route

const testRouter = require("./routes/testroute");
app.use("/test", testRouter); // Test route

const babbleRouter = require("./routes/babbleroute");
app.use("/babble", babbleRouter); // Transcription route

app.post("/api/upload",  (req, res) => {
  uploader.handleUpload(req, res, async (hash, originalFileName) => {
    // Pass the hash to the cache handler or perform any other operations
    const newFileName = `${hash}${path.extname(originalFileName)}`;

    // Rename the cache file into the hash string
    cacheRename.renameFile(originalFileName, newFileName);

    let data;
    let srt;
    let txt;

    // Check if the record already exists in the Babble collection
    try {
      console.log("Existing record:");
      const existingRecord = await Babble.findOne({ id: newFileName });
      
      if (existingRecord) {
        // Use existing data
        srt = existingRecord.srt;
        txt = existingRecord.txt;
        console.log(srt, txt);
        // console.log("Using existing data");
        
        
        //const backpropagate = require('./functionals/backpropagate');
        //backpropagate.sendToFrontend(txt);

      } else {
        // Initiate transcription
        const transcription = await transcriber.callModel(newFileName);
        console.log("Transcription:", transcription);

        // Save the transcription in the Babble collection
        const newRecord = new Babble({ id: newFileName, srt: "", txt: transcription });
        await newRecord.save();

        // const backpropagate = require('./functionals/backpropagate');
        srt = "This is the srt string";
        txt = transcription;
        
        // backpropagate.sendToFrontend(transcription);
      }
      
      data = { srt, txt };
      console.log("Data to be sent: " + JSON.stringify(data));
      // data = JSON.stringify(data);

    } catch (error) {
      console.error("Error in transcription:", error);
      res.status(500).send('Internal Server Error');
    } finally {
      // Remove files from the filecache directory
      fs.emptyDirSync('./filecache');
    }
    
    // Send the data to the frontend
    res.json(data);
    
  });
});

module.exports = {connection};


/*
    transcriber.callModel(newFileName)
      .then(transcription => {
        console.log("Transcription:", transcription);

        const backpropagate = require('./functionals/backpropagate');
        const srt = "This is the srt string";
        const txt = transcription;

        const data = { srt, txt };
        console.log("Data to be sent: " + data);
        backpropagate.sendToFrontend(data);
        fs.emptyDirSync('./filecache');
      })
      .catch(error => {
        console.error("Error in transcription:", error);
      });
*/

    // const backpropagate = require('./functionals/backpropagate');
    // const srt = "This is the srt string";
    // const txt = "This is the txt string";
    // const data = { srt, txt };
    // backpropagate.sendToFrontend(data);