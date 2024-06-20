const route =  require('express').Router()
const {accountRegister} = require('../controller/accountController')

route.post('/', accountRegister)

module.exports = route