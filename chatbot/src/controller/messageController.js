const axios = require("axios");
const Message = require("../model/message");
const Response = require("../model/response");
const User = require("../model/user");
const Conversation = require("../model/conversation");

const flowise = async (data) => {
    const authToken = process.env.AUTH_FLOWISE_TOKEN;
    
    if (!authToken) {
      throw new Error("AUTH_FLOWISE_TOKEN is not defined");
    }
    
    try {
      const question ={"question": data}
      const response = await axios.post(
        "http://localhost:3000/api/v1/prediction/77363697-140e-44e7-91a4-1b82a1b05add",
        question,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json' // Ajout du type d
          },
        }
      );
      
      // axios stocke directement les données de réponse dans response.data
      return response.data.text;

    } catch (err) {
      console.log(err);
      // Optionnel : renvoyer l'erreur ou une valeur par défaut
      throw err; // ou return null; ou return { error: err.message };
    }
}

const sendMessage = async (req, res) => {

  
  try {
    const { content, senderID } = req.body;
    
      // const hello  = await flowise('hello');
      // console.log(hello)





    if (!content || !senderID) {
      const message = "missing data";
      res.status(400).json(message);
    }
    const message = new Message({
      content,
      senderID,
    });
    messageSaved = await message.save();
    console.log(messageSaved)




    let response = new Response({
      content: "",
      messageID: messageSaved._id,
    });


    response.content = await flowise(content);

    const responseSaved = await response.save();
    const msg = "message successfully saved";
    
    // let conversation = await Conversation.findOne({ id: conversationID });

    // if (conversation) {
    //   // If conversation exists, update it
    //   conversation.messages.push(messageSaved._id);
    //   conversation.responses.push(responseSaved._id);
    //   await conversation.save();
    // } 

    // const conversationSaved = await conversation.save()

    return res.status(201).json({msg,  messageSaved, responseSaved  });
  } catch (err) {
    const message = "server internal problem";
    return res.status(500).json({  message, err });
  }
};


const getMessages = async(req, res) =>{
    try{
        const message = Message.find()
        return res.status(200).json({message: 'all messeges retrieved sucessfully', message})
    }catch(err){
        res.json(err)
    }
}

const getResponse = async(req, res) =>{
    try{
        const response = Response.find()
        return res.status(200).json({messages: 'all response retrieved sucessfully', response})
    }catch(err){
        res.json(err)
    }
}

module.exports = {
  sendMessage,getMessages,getResponse
};
