const mongoose = require('mongoose');

const babbleSchema = new mongoose.Schema({
  id: String,
  srt: String,
  txt: String,
});

const Babble = mongoose.model('transcriptions', babbleSchema);

module.exports = Babble;
