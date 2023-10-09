const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  id: String,
  field2: String,
  field3: String,
});

const Test = mongoose.model('test_info', testSchema);

module.exports = Test;
