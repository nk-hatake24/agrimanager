const route = require('express').Router()
const { addBudget, updateBudget, deleteBudget, getAllBudget} = require('../controller/budgetController')
const { ech } = require('../controller/employeeController')
const {authenticateJWT, authorizeRoles} = require('../config/auth')


route.post('/', addBudget)
route.put('/:id_budget', updateBudget)
route.delete('/:id', deleteBudget)
route.get('/', getAllBudget)
route.get('/f', authenticateJWT, authorizeRoles("admin", "manager"),ech)


module.exports = route