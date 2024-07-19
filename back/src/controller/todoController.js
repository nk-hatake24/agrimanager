const Todo = require('../model/todoModel')

const addTodo = async (req, res) => {
    try {
      const { employee,
        title,
        description, manager} = req.body;
  
      // Créer une nouvelle ressource
      const newtodo = new Todo({
        employee,
        title,
        description, manager
      });
  
      // Sauvegarder la ressource dans la base de données
      await newtodo.save();
  
      // Envoyer la ressource créée en réponse
      res.status(201).json(newtodo);
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(400).json({ error: error.message });
    }
  }

const getAllTodos = async (req, res) => {
    try {
      // Récupérer toutes les ressources de la base de données
      const todos = await Todo.find().populate('employee').populate('manager');
      ;
      // Envoyer les ressources en réponse
      res.status(200).json(todos);
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(500).json({ error: error.message });
    }
  }

  const modifyTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const { employee,
        title,
        description, manager } = req.body;
  
      // Trouver et mettre à jour la ressource
      const updatedtodo = await Todo.findByIdAndUpdate(
        id,
        { employee,
            title,
            description, manager },
        { new: true, runValidators: true }
      );
  
      // Vérifier si la ressource existe
      if (!updatedtodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      // Envoyer la ressource mise à jour en réponse
      res.status(200).json(updatedtodo);
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(400).json({ error: error.message });
    }
  }

const deleteTodo =  async (req, res) => {
    try {
      const { id } = req.params;
  
      // Trouver et supprimer la ressource
      const deletedtodo = await Todo.findByIdAndDelete(id);
  
      // Vérifier si la ressource existe
      if (!deletedtodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      // Envoyer un message de succès
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = {
    addTodo, getAllTodos, modifyTodo, deleteTodo
  }