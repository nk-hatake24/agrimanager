const route = require('express').Router()
const { addBudget, updateBudget, deleteBudget, getAllBudget} = require('../controller/budgetController')
const { ech } = require('../controller/employeeController')
const {authenticateJWT, authorizeRoles} = require('../config/auth')


route.post('/', authenticateJWT, authorizeRoles("manager"), addBudget)
route.put('/:id_budget', authenticateJWT, authorizeRoles("manager"), updateBudget)
route.delete('/:id', authenticateJWT, authorizeRoles("manager"),deleteBudget)
route.get('/', authenticateJWT, authorizeRoles("admin","manager", "employee "),getAllBudget)
route.get('/f', authenticateJWT, authorizeRoles("admin"),ech)


module.exports = route