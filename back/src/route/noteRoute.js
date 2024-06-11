const route = require('express').Router()
const { authenticateJWT, authorizeRoles } = require('../config/auth')
const { getAllNote, addNote, modifyNote, deleteNote } = require('../controller/noteController')

route.get('/', authenticateJWT, authorizeRoles("manager","employee",  "admin"), getAllNote)
route.post('/', authenticateJWT, authorizeRoles("manager",  "admin"),addNote)
route.put('/:id', authenticateJWT, authorizeRoles("manager",  "admin"),modifyNote)
route.delete('/:id',authenticateJWT, authorizeRoles("manager",  "admin"), deleteNote)

module.exports = route
