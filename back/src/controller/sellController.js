const Sell = require("../model/sellModel");
const Resource = require("../model/resourceModel");
const Employee = require('../model/employeeModel')

// ******************* addSell ***********************
const addSell = async (req, res) => {
  const { date, resource, quantity_resource, employee } = req.body;

  try {
    const resourceData = await Resource.findById(resource).populate('resource');
    if (!resourceData) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const total_price = quantity_resource * resourceData.unit_price;

    const transaction = new Sell({
      resource,
      quantity_resource,
      total_price,
      employee,
      date,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json({
      message: "Sell added successfully",
      data: savedTransaction,
    });
  } catch (error) {
    console.error("Error adding sell:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// ********************** update transaction ********************************
const updateSell = async (req, res) => {
  const { id } = req.params;
  const { date, resource, quantity_resource, employee } = req.body;

  try {
    const transaction = await Sell.findOneAndUpdate(
      { _id: id },
      { $set: { date,resource, employee, resource }},
      { new: true, runValidators: true }
    )
    if (!transaction) {
      return res.status(404).json({ message: "Sell not found" });
    }

    const resource = await Resource.findById(transaction.resource);
    if (!resource) {
      return res.status(404).json({
        message: "Resource not found associated with the transaction",
      });
    }
    if (quantity_resource && quantity_resource !== transaction.quantity_resource) {
      transaction.total_price = quantity_resource * resource.unit_price;
      transaction.quantity_resource = quantity_resource;
    }

    const updatedTransaction = await transaction.save();
    res.status(200).json({
      message: "Sell updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllSell = async (req, res) => {
  try {
    const transaction = await Sell.find()
    return res
      .status(200)
      .json({ message: "all the employee search", data: transaction });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addSell, updateSell, getAllSell };
