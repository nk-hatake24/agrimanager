const route = require('express').Router()
const { authenticateJWT, authorizeRoles } = require('../config/auth')
const { getAllNote, addNote, modifyNote, deleteNote } = require('../controller/noteController')

route.get('/', authenticateJWT, authorizeRoles("manager", "employee", "admin"), getAllNote)
route.post('/', authenticateJWT, authorizeRoles("manager", "employee", "admin"),addNote)
route.put('/:id', authenticateJWT, authorizeRoles("manager", "employee", "admin"),modifyNote)
route.delete('/:id',authenticateJWT, authorizeRoles("manager", "employee", "admin"), deleteNote)

module.exports = route
