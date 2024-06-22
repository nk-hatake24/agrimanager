const axios = require("axios");
const Message = require("../model/message");
const Response = require("../model/response");
const User = require("../model/user");

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
            'Content-Type': 'application/json' // Ajout du type de contenu
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
  const  data= "hello"
  const question = await flowise(data)
  console.log(question)
  
  try {
    const { content, senderID } = req.body;

    if (!content || !senderID) {
      const message = "missing data";
      res.status(400).json(message);
    }
    const message = new Message({
      content,
      senderID,
    });
    messageSaved = await message.save();

    const response = new Response({
      content: "",
      messageID: messageSaved._id,
    });

    response.content = await flowise(content);

    const responseSaved = await response.save();
    const msg = "message successfully saved";
    return res.status(201).json({msg, messageSaved, responseSaved });
  } catch (err) {
    const message = "server internal problem";
    return res.status(500).json({ message, err });
  }
};

module.exports = {
  sendMessage,
};
