const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    responseID: { type: Number, required: true, unique: true },
    messageID: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    content: { type: String, required: true }
  });
  
  const Response = mongoose.model('Response', responseSchema);
  module.exports = Response;
  