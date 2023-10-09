const mongoose = require('mongoose');

const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });  // Load environment variables from .env

const Db = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

db.on('open', () => {
  console.log('Successfully connected to MongoDB.');
});

module.exports = db;

