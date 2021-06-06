const mongoose = require('mongoose');

require('dotenv').config();

console.log(process.env.MONGODB_URI) 
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kalib-hicks:Bard1218958@cluster0.sspdg.mongodb.net/kalibfinalproject?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;