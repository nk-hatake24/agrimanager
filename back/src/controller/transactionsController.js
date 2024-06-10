const Transaction = require("../model/transactionsModel");
const Resource = require("../model/resourceModel");
const Employee = require("../model/employeeModel");

// ******************* addTransaction ***********************
const addTransaction = async (req, res) => {
  const { date, resource, quantity_resource, employee } = req.body;

  try {
    const resourceData = await Resource.findById(resource);
    if (!resourceData) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const total_price = quantity_resource * resourceData.unit_price;

    const transaction = new Transaction({
      resource,
      quantity_resource,
      total_price,
      employee,
      date,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json({
      message: "Transaction added successfully",
      data: savedTransaction,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// ********************** update transaction ********************************
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { date, resource, quantity_resource, employee } = req.body;

  try {
    let transaction = await Transaction.findOneAndUpdate(
      { _id: id },
      { $set: { date, resource, employee } },
      { new: true, runValidators: true }
    );
    
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const resourceData = await Resource.findById(resource);
    if (!resourceData) {
      return res.status(404).json({
        message: "Resource not found associated with the transaction",
      });
    }

    if (quantity_resource && quantity_resource !== transaction.quantity_resource) {
      transaction.total_price = quantity_resource * resourceData.unit_price;
      transaction.quantity_resource = quantity_resource;
      transaction = await transaction.save(); // Save updated transaction with new total_price and quantity_resource
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const getAllTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.find()
      .populate("employee")
      .populate("resource");
    return res
      .status(200)
      .json({ message: "all the transaction search", data: transaction });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addTransaction, updateTransaction, getAllTransactions };
