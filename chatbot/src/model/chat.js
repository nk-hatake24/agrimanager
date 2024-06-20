const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }]
  });
  
  const Chat = mongoose.model('Chat', chatSchema);
  module.exports = Chat;
  