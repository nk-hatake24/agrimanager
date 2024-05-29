const route = require('express').Router()

const {addTransaction, updateTransaction, getAllTransactions} = require('../controller/transactionsController')

route.post('/', addTransaction)
route.put('/:id_transtion', updateTransaction)
route.get('/', getAllTransactions)

module.exports = route