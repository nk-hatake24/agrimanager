const route = require('express').Router()

const { authenticateJWT, authorizeRoles } = require('../config/auth')
const {addSell, updateSell, getAllSell} = require('../controller/sellController')

route.post('/', authenticateJWT, authorizeRoles("manager", "employee", "admin"),addSell)
route.put('/:id', authenticateJWT, authorizeRoles("manager", "employee", "admin"),updateSell)
route.get('/', authenticateJWT, authorizeRoles("manager", "employee", "admin"),getAllSell)

module.exports = route