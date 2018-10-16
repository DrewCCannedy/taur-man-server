var mongoose = require('mongoose');

var Instance = mongoose.model('Instance', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  }
});

module.exports = {Instance};