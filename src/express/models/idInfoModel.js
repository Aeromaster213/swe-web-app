const mongoose = require('mongoose');

const idInfoSchema = new mongoose.Schema({
  id: String,
  password: String,
});

const IdInfo = mongoose.model('IdInfo', idInfoSchema);

module.exports = IdInfo;
