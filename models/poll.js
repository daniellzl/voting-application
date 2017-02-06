var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
  userID: String,
  name: String,
  options: [{
      optionName: String,
      votes: Number
  }]
});

module.exports = mongoose.model('poll', pollSchema);
