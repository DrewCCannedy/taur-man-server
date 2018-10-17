var mongoose = require('mongoose');

var Instance = mongoose.model('Instance', {
  playerX: {
    type: Number
  },
  playerY: {
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