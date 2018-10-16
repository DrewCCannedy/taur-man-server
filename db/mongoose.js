var mongoose = require('mongoose');

// use js promise lib
mongoose.Promise = global.Promise;
// connect to local mongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taur-man');

module.exports = {
  mongoose
}