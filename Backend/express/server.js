const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs-extra");
const bcrypt = require("bcrypt");
const iconv = require('iconv-lite');

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

// Import the user route
const userRouter = require("./routes/userRoute");
app.use("/user", userRouter); // User route



// Authentication endpoints

// Signup route
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send('Internal Server Error');
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // You may generate and send a token for authentication here if needed

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send('Internal Server Error');
  }
});



// Upload route
app.post("/api/upload",  (req, res) => {
  uploader.handleUpload(req, res, async (hash, originalFileName) => {
    // Pass the hash to the cache handler or perform any other operations
    const newFileName = `${hash}${path.extname(originalFileName)}`;
    
    const language = req.body.language;
    const username = req.body.username;
    
    console.log("Language: ", language);

    // Rename the cache file into the hash string
    cacheRename.renameFile(originalFileName, newFileName);

    const parts = newFileName.split(".");
    const extension = parts[parts.length - 1];

    let data;
    let srt;
    let txt;

    // Check if the record already exists in the Babble collection
    try {
      console.log("Existing record:");
      const existingRecord = await Babble.findOne({ 
        id: newFileName, 
        user: username, 
        language: language });
      
      if (existingRecord) {
        // Use existing data
        srt = existingRecord.srt;
        txt = existingRecord.txt;
        console.log(srt, txt);
        
        data = { srt, txt };
        
      } else {
        // Initiate transcription
        // const transcription = await transcriber.callModel(newFileName);
        let transcription;
        if (extension === "txt"){
          transcription = await transcriber.callText(newFileName, language);
        } else {
          transcription = await transcriber.callMultimedia(newFileName, language);
        }
        console.log(transcription);
        
        const utf8String = iconv.decode(transcription, 'utf8');
        data = JSON.parse(utf8String);

        console.log("Subtitle:", data.srt);
        console.log("Text: ", data.txt);

        // Save the transcription in the Babble collection
        const newRecord = new Babble({
          id: newFileName, 
          user: username, 
          language: language, 
          srt: data.srt, 
          txt: data.txt });
        await newRecord.save();

      }
      
      
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


