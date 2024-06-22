const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref:'User'},
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }]
  });
  
  const Conversation = mongoose.model('Conversation', conversationSchema);
  module.exports = Conversation;
  