var mongoose = require('mongoose');

// use js promise lib
mongoose.Promise = global.Promise;
// connect to local mongoDB
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
}