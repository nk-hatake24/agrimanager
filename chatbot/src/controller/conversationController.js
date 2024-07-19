const Conversation = require('../model/conversation')

const getConversation = async (req, res)=>{

    try{
        const conversation = await Conversation.find().populate("messages").populate("responses")
        return res.status(200).json({message: 'all messeges retrieved sucessfully', conversation})
    }catch(err){
        res.json(err)
    }

}

const addcConversation = async (req, res) => {
    try {
      const { userID, messages, responses } = req.body;
      if (!userID || !messages || !responses) {
        return res.status(400).json({ message: "All fields must be filled" });
      }
  
      const newconversation = new conversation({
        userID,
        messages,
        responses,
      });
  
      const savedconversation = await newconversation.save();
      res
        .status(201)
        .json({ message: "conversation added successfully", data: savedconversation });
    } catch (error) {
      console.error("Error adding conversation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = {
    getConversation, addcConversation
}