const Sell = require("../model/sellModel");
const Resource = require("../model/resourceModel");
const Employee = require('../model/employeeModel');

// ******************* addSell ***********************
const addSell = async (req, res) => {
    const { date, resource, quantity_resource, employee } = req.body;
  
    try {
      const resourceData = await Resource.findById(resource);
      if (!resourceData) {
        return res.status(404).json({ message: "Resource not found" });
      }
  
      const total_price = quantity_resource * resourceData.unit_price;
  
      const sell = new Sell({
        resource,
        quantity_resource,
        total_price,
        employee,
        date,
      });
  
      const savedSell = await sell.save();
      res.status(201).json({
        message: "Sell added successfully",
        data: savedSell,
      });
    } catch (error) {
      console.error("Error adding sell:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

// ********************** updateSell ********************************
const updateSell = async (req, res) => {
  const { id } = req.params;
  const { date, resource, quantity_resource, employee } = req.body;

  try {
    let sell = await Sell.findOneAndUpdate(
      { _id: id },
      { $set: { date, resource, employee } },
      { new: true, runValidators: true }
    );

    if (!sell) {
      return res.status(404).json({ message: "Sell not found" });
    }

    const resourceData = await Resource.findById(resource);
    if (!resourceData) {
      return res.status(404).json({
        message: "Resource not found associated with the sell",
      });
    }

    if (quantity_resource && quantity_resource !== sell.quantity_resource) {
      sell.total_price = quantity_resource * resourceData.unit_price;
      sell.quantity_resource = quantity_resource;
      sell = await sell.save(); // Save updated sell with new total_price and quantity_resource
    }

    res.status(200).json({
      message: "Sell updated successfully",
      data: sell,
    });
  } catch (error) {
    console.error("Error updating sell:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ********************** getAllSell ********************************
const getAllSell = async (req, res) => {
  try {
    const sells = await Sell.find()
      .populate("employee")
      .populate("resource");
      
    return res.status(200).json({ message: "All sells retrieved successfully", data: sells });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addSell, updateSell, getAllSell };
