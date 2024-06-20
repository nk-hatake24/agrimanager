const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        unique: [true , ' the id most be unique']
       },
        name_employee:{
          type: String,
          required: [true, 'name of the user is required']
      },
      function_employee:{
          type: String,
          required: [true, 'the function of the user is required'],
          enum:['employee', 'manager', 'admin']
      },
        email: {
          type: String,
          required: [true, "email is required"],
          unique: true
        },
        password: {
          type: String,
          required: [true, "password is required"],
        },
        salary: {
          type: String,
        },
        address: {
          type: String,
        },
        chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
        conversationHistory: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
