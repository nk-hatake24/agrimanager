const messageSchema = new Schema({
    messageID: { type: String, required: true, unique: true },
    senderID: { type: String, required: true, unique: true },
    timestamp: { type: Date, default: Date.now },
    content: { type: String, required: true }
  });
  
  const Message = mongoose.model('Message', messageSchema);
  module.exports = Message;
  