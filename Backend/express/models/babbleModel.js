const mongoose = require('mongoose');

const babbleSchema = new mongoose.Schema({
  id: String,
  user: String,
  file: String,
  language: String,
  srt: String,
  txt: String,
});

const Babble = mongoose.model('transcriptions', babbleSchema);

// Static method to find records by user
babbleSchema.statics.findByUser = async function (user) {
  return this.find({ user });
};

module.exports = Babble;
