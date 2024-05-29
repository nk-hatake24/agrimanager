const Resource = require('../model/resourceModel')

const addResource = async (req, res) => {
    try {
      const { id_resource, quantity_resource, unit_price, name_resource, Supplier } = req.body;
  
      // Créer une nouvelle ressource
      const newResource = new Resource({
        id_resource,
        quantity_resource,
        unit_price,
        name_resource,
        Supplier,
      });
  
      // Sauvegarder la ressource dans la base de données
      await newResource.save();
  
      // Envoyer la ressource créée en réponse
      res.status(201).json(newResource);
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(400).json({ error: error.message });
    }
  }

const getAllResources = async (req, res) => {
    try {
      // Récupérer toutes les ressources de la base de données
      const resources = await Resource.find();
      // Envoyer les ressources en réponse
      res.status(200).json(resources);
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(500).json({ error: error.message });
    }
  }

  const modifyResource = async (req, res) => {
    try {
      const { id } = req.params;
      const { id_resource, quantity_resource, unit_price, name_resource, Supplier } = req.body;
  
      // Trouver et mettre à jour la ressource
      const updatedResource = await Resource.findByIdAndUpdate(
        id,
        { id_resource, quantity_resource, unit_price, name_resource, Supplier },
        { new: true, runValidators: true }
      );
  
      // Vérifier si la ressource existe
      if (!updatedResource) {
        return res.status(404).json({ message: "Resource not found" });
      }
  
      // Envoyer la ressource mise à jour en réponse
      res.status(200).json(updatedResource);
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(400).json({ error: error.message });
    }
  }

const deleteResource =  async (req, res) => {
    try {
      const { id } = req.params;
  
      // Trouver et supprimer la ressource
      const deletedResource = await Resource.findByIdAndDelete(id);
  
      // Vérifier si la ressource existe
      if (!deletedResource) {
        return res.status(404).json({ message: "Resource not found" });
      }
  
      // Envoyer un message de succès
      res.status(200).json({ message: "Resource deleted successfully" });
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = {
    addResource, getAllResources, modifyResource, deleteResource
  }