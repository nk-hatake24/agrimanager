const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    conversationID: { type: String, required: true, unique: true },
    userID: { type: String, required: true, unique: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
  });
  
  const Conversation = mongoose.model('Conversation', conversationSchema);
  module.exports = Conversation;
  