const mongoose = require('mongoose');

const babbleSchema = new mongoose.Schema({
  id: String,
  user: String,
  file: String,
  language: String,
  srt: String,
  txt: String,
});

// Static method to find records by user
babbleSchema.statics.findByUser = async function (user) {
  // Use Mongoose to find records with the specified user
  return this.find({ user });
};

const Babble = mongoose.model('transcriptions', babbleSchema);

module.exports = Babble;
