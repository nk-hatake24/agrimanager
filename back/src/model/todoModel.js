const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      required: [true, "the title is required"],
    },
    description: {
      type: String,
      required: [true, "the description is required"],
    },
    
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const todoModel = mongoose.model("Todo", TodoSchema);

module.exports = todoModel;
