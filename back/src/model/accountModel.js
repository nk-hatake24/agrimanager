const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
   
    name_account: {
        type: String,
        required: [true, "the name of account is required"],
        unique: [true, "the name of account is unique"]

    },
    email_account:{
        type: String,
        required: [true, "the email of the general account most be given"]
    },
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "budget",
      },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
    },
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
