var mongoose = require('mongoose');

var Instance = mongoose.model('Instance', {
  o_spartanX: {
    type: Number
  },
  o_spartanY: {
    type: Number
  },
  o_minotaurX: {
    type: Number
  },
  o_minotaurY: {
    type: Number
  }
});

module.exports = {Instance};