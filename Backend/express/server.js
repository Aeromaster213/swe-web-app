/** Importing Dependencies */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs-extra");
const bcrypt = require("bcrypt");
const iconv = require('iconv-lite');

/** Load environment variables from .env  */
dotenv.config(); 

/**
 * Loads environment variables from a file using the 'dotenv' library.
 *
 * @throws {Error} If an error occurs during the environment variable loading process.
 */
const result = dotenv.config();


// Check if there was an error while loading environment variables
if (result.error) {
  // If an error occurred, throw an exception with the error details
  throw result.error;
}
else{
  // If no error occurred, log a success message indicating that environment variables are successfully imported
  console.log("Successfully imported environment variables...");
}

// Initializing variables
const app = express(); // creating instance of express app
const port = process.env.PORT || 5000;

/** using CORS to connect to port 3000 on which Frontend is running */
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());


// Get MongoDB Atlas connection URI from environment variables
const uri = process.env.ATLAS_URI;

// Get the default Mongoose connection object
const connection = mongoose.connection;

/**
 * Event listener for the "connecting" event.
 * @event connection
 * @memberof mongoose.connection
 * @callback connectingCallback
 * @description Logs a message when connecting to the database.
 */
connection.on("connecting",()=>{
  console.log("Connecting to database...");
})

/**
 * Event listener for the "connected" event.
 * @event connection
 * @memberof mongoose.connection
 * @callback connectedCallback
 * @description Logs a message when successfully connected to the database.
 */
connection.on("connected",()=>{
  console.log("Connected to database.");
})

/**
 * Event listener for the "disconnected" event.
 * @event connection
 * @memberof mongoose.connection
 * @callback disconnectedCallback
 * @description Logs a message when disconnected from the database.
 */
connection.on("disconnected",()=>{
  console.log("Disconnected from database.");
})

/**
 * Event listener for the "error" event.
 * @event connection
 * @memberof mongoose.connection
 * @callback errorCallback
 * @param {Error} err - The error object received from MongoDB.
 * @description Logs MongoDB connection errors.
 */
connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Start Server after successful MongoDB connection
mongoose.connect(uri).then(()=>{
  // Establish a connection to the MongoDB server using the provided URI
  app.listen(port, () => {
    // Start the Express server and listen on the specified port
    console.log(`Server is running on port: ${port}`);
    console.log('Press Ctrl+C to quit.');
  });
});


/** Importing all the necessary utilities */
const uploader = require('./functionals/uploader'); // Importing uploader module
const cacheRename = require('./functionals/cache_rename'); // Importing cache_rename module
const transcriber = require('./functionals/transcriber'); // Import the transcriber module


/** Importing all the necessary MongoDB Models */
const Babble = require("./models/babbleModel"); // Import the Babble model
const User = require("./models/userModel"); // Import the User model

/** Importing all the necessary MongoDB Routers */
const recordRouter = require("./routes/record");
app.use("/records", recordRouter); // Info route

const testRouter = require("./routes/testroute");
app.use("/test", testRouter); // Test route

const babbleRouter = require("./routes/babbleroute");
app.use("/babble", babbleRouter); // Transcription route

const userRouter = require("./routes/userRoute");
app.use("/user", userRouter); // User route



/** API call endpoints for Authentication */

/**
 * Handles user signup by checking if the username already exists,
 * hashing the password, and saving the new user to the database.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
app.post("/api/signup", async (req, res) => {
  try {
    // Destructure the username and password from the request body
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

    // Send a success message in response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Log and send an error response in case of an exception
    console.error("Error in signup:", error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * Handles user login by verifying the entered credentials
 * and responding with a success message or an error.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
app.post("/api/login", async (req, res) => {
  try {
    // Destructure the username and password from the request body
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

    // We may generate and send a token for authentication here if needed

    // Send a success message in response
    res.json({ message: "Login successful" });
  } catch (error) {
    // Log and send an error response in case of an exception
    console.error("Error in login:", error);
    res.status(500).send('Internal Server Error');
  }
});



/** API call endpoint for Uploading and Transcription */

/**
 * Handles file upload, transcription, and response to the frontend.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
app.post("/api/upload",  (req, res) => {
  uploader.handleUpload(req, res, async (hash, originalFileName) => {
    // Rename the cache file into the hash string
    const newFileName = `${hash}${path.extname(originalFileName)}`;
    
    // Extract language and username from the request body
    const language = req.body.language;
    const username = req.body.username;
    
    console.log("Language: ", language);

    // Rename the cache file into the hash string
    cacheRename.renameFile(originalFileName, newFileName);

    // Extract the extension from the file name
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
        let transcription;
        if (extension === "txt"){
          // Call the text transcription method
          transcription = await transcriber.callText(newFileName, language);
        } else {
          // Call the multimedia transcription method
          transcription = await transcriber.callMultimedia(newFileName, language);
        }
        console.log(transcription);
        
        // Decode the transcription from buffer to utf8 string for JSON parsing
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

    } catch (error) {
      // Log and send an error response in case of an exception
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


