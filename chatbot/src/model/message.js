const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    // messageID: { type: String, required: true, unique: true },
    senderID: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    content: { type: String, required: true }
  });
  
  const Message = mongoose.model('Message', messageSchema);
  module.exports = Message;
  