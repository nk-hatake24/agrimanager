const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    
    quantity_product: {
      type: Number,
      required: [true, "the quantity of resource is required"],
    },
    unit_price: {
      type: Number,
      required: [true, "the price of the resource is required"],
    },
    name_product: {
      type: String,
      required: [true, "the name of the resource is required"],
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Product", ProductSchema);

module.exports = productModel;