const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    conversationID: { type: Number, required: true, unique: true },
    userID: {type: Schema.Types.ObjectId, ref: 'User' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
  });
  
  const Conversation = mongoose.model('Conversation', conversationSchema);
  module.exports = Conversation;
  