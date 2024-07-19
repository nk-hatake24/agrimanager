const Product = require('../model/productModel')

const addProduct = async (req, res) => {
    try {
      const { id_product, quantity_product, unit_price, name_product } = req.body;
  
      // Créer une nouvelle ressource
      const newProduct = new Product({
        id_product,
        quantity_product,
        unit_price,
        name_product,
       
      });
  
      // Sauvegarder la ressource dans la base de données
      await newProduct.save();
  
      // Envoyer la ressource créée en réponse
      res.status(201).json(newProduct);
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(400).json({ error: error.message });
    }
  }

const getAllProducts = async (req, res) => {
    try {
      // Récupérer toutes les ressources de la base de données
      const products = await Product.find()
      ;
      // Envoyer les ressources en réponse
      res.status(200).json(products);
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(500).json({ error: error.message });
    }
  }

  const modifyProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { id_product, quantity_product, unit_price, name_product} = req.body;
  
      // Trouver et mettre à jour la ressource
      const updatedproduct = await Product.findByIdAndUpdate(
        id,
        { id_product, quantity_product, unit_price, name_product },
        { new: true, runValidators: true }
      );
  
      // Vérifier si la ressource existe
      if (!updatedproduct) {
        return res.status(404).json({ message: "product not found" });
      }
  
      // Envoyer la ressource mise à jour en réponse
      res.status(200).json(updatedproduct);
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(400).json({ error: error.message });
    }
  }

const deleteProduct =  async (req, res) => {
    try {
      const { id } = req.params;
  
      // Trouver et supprimer la ressource
      const deletedproduct = await Product.findByIdAndDelete(id);
  
      // Vérifier si la ressource existe
      if (!deletedproduct) {
        return res.status(404).json({ message: "product not found" });
      }
  
      // Envoyer un message de succès
      res.status(200).json({ message: "product deleted successfully" });
    } catch (error) {
      // Gérer les erreurs et envoyer une réponse appropriée
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = {
    addProduct, getAllProducts, modifyProduct, deleteProduct
  }