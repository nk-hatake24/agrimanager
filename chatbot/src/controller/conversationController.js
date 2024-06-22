const Conversation = require('../model/conversation')

const getConversation = async (req, res)=>{

    try{
        const conversation = await Conversation.find().populate("messages").populate("responses")
        return res.status(200).json({message: 'all messeges retrieved sucessfully', conversation})
    }catch(err){
        res.json(err)
    }

}


module.exports = {
    getConversation
}