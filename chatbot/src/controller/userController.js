const Chat = require('../model/chat');
const User = require('../model/user')

const userRegister = async (req, res) => {
    try {
      // Validation des données reçues
      const {
        name_employee,
        email,
        password,
        function_employee,
        salary,
        address,
        
      } = req.body;
      if (!name_employee || !email || !password) {
        return res.status(400).json({ message: "Données manquantes" });
      }
      //  find wether another user existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
  
      // Création d'un nouvel utilisateurs
      const user = new User({
        name_employee,
        function_employee,
        salary,
        address,
        email,
        password,
      });

      const chat = new Chat({
        userID: user._id
      })
      
      user.save().then(user =>{
        console.log(user)
      
      

        chat.save();
      });
      
  
      // Envoi d'une réponse succès
      return res
        .status(201)
        .json({ message: "user saved successfully", data: {user,chat}});
    } catch (error) {
      // Gestion des erreurs
      console.error(error);
      return res.status(500).json({ message: "Erreur interne du serveur" });
    }
  };
  


  module.exports= {
    userRegister
  }