const mongoose = require('mongoose');

const idInfoSchema = new mongoose.Schema({
  id: String,
  password: String,
});

const IdInfo = mongoose.model('user_info', idInfoSchema);

module.exports = IdInfo;
