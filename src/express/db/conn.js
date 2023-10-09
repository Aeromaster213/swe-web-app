const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });  // Load environment variables from .env

const Db = process.env.ATLAS_URI;
console.log("Imported in conn.js: " + Db);

const connectToServer = (callback) => {
  mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Successfully connected to MongoDB.");
    }
    return callback(err);
  });
};

module.exports = connectToServer;

