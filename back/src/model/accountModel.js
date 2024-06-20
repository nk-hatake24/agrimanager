const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    name_account: {
      type: String,
      required: [true, "the name of account is required"],
      unique: [true, "the name of account is unique"],
    },
    budget: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Budget",
    },
    employee: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Employee",
  
    },
    resource: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Resource",

    },
    supplier: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Supplier",
    },
    transaction: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Transaction",
    },
    stock: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Stock",
    },
    report: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Report",
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
