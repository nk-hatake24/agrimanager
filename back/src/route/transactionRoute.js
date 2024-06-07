const route = require('express').Router()

const { authenticateJWT, authorizeRoles } = require('../config/auth')
const {addTransaction, updateTransaction, getAllTransactions} = require('../controller/transactionsController')

route.post('/', authenticateJWT, authorizeRoles("manager", "employee"),addTransaction)
route.put('/:id_transtion', authenticateJWT, authorizeRoles("manager", "employee"),updateTransaction)
route.get('/', authenticateJWT, authorizeRoles("manager", "employee", "admin"),getAllTransactions)

module.exports = route