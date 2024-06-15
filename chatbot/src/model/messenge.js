const messageSchema = new Schema({
    messageID: { type: Number, required: true, unique: true },
    senderID: {type: Schema.Types.ObjectId, ref: 'user'},
    timestamp: { type: Date, default: Date.now },
    content: { type: String, required: true }
  });
  
  const Message = mongoose.model('Message', messageSchema);
  module.exports = Message;
  