const route = require('express').Router()
const { addBudget, updateBudget, deleteBudget, getAllBudget} = require('../controller/budgetController')

route.post('/', addBudget)
route.put('/:id_budget', updateBudget)
route.delete('/:id', deleteBudget)
route.get('/', getAllBudget)

module.exports = route