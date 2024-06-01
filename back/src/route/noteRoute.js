const route = require('express').Router()
const { getAllNote, addNote, modifyNote, deleteNote } = require('../controller/noteController')

route.get('/', getAllNote)
route.post('/', addNote)
route.put('/:id', modifyNote)
route.delete('/:id', deleteNote)

module.exports = route
