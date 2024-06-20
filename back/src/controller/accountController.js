const Account =  require('../model/accountModel')


const accountRegister = async (req, res) => {
    try {
      // Validation des données reçues
      const {
        user, 
        name_account
      } = req.body;
      if (!user || !name_account) {
        console.log({user , name_account})
        return res.status(400).json({ message: "Données manquantes" });
      }
      //  find wether another user existe
      const existingAccount = await Account.findOne({ name_account });
      if (existingAccount) {
        return res.status(400).json({ message: "An account with this name already exist" });
      }
  
      // Création d'un nouvel utilisateurs
      const account = new Account({
        user,
        name_account
      });
      await account.save();
  
      // Envoi d'une réponse succès
      return res
        .status(201)
        .json({ message: "account saved successfully", data: account });
    } catch (error) {
      // Gestion des erreurs
      console.error(error);
      return res.status(500).json({ message: "Erreur interne du serveur" });
    }
  };


  module.exports ={ accountRegister}