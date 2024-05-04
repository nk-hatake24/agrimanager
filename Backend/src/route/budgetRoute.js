const route = require('express').Router()
const { addBudget, updateBudget, deleteBudget, searchAllBudget} = require('../controller/budgetController')

route.post('/', addBudget)
route.get('/', searchAllBudget)
route.put('/:id_budget', updateBudget)
route.delete('/:id', deleteBudget)

module.exports = route