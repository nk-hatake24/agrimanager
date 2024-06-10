const Note = require('../model/noteModel')

const addNote = async (req, res) => {
    try {
      const { title, description,employee } = req.body;
      const newNote = new Note({
        title,
        description,
        employee
      });
  
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const getAllNote =  async (req, res) => {
    try {
      const notes = await Note.find()
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

const modifyNote = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, description },
        { new: true, runValidators: true }
      );
  
      if (!updatedNote) {
        return res.status(404).json({ message: "Note not found" });
      }
  
      res.status(200).json(updatedNote);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }



  const deleteNote = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedNote = await Note.findByIdAndDelete(id);
  

      if (!deletedNote) {
        return res.status(404).json({ message: "Note not found" });
      }

      res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } 

  module.exports = { addNote, getAllNote, modifyNote,  deleteNote}