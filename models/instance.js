var mongoose = require('mongoose');

var Instance = mongoose.model('Instance', {
  humanX: {
    type: Number
  },
  humanY: {
    type: Number
  },
  taurX: {
    type: Number
  },
  taurY: {
    type: Number
  }
});

module.exports = {Instance};