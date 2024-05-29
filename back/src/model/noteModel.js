const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "The title is required"],
    },
    description: {
      type: String,
      required: [true, "The description is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
