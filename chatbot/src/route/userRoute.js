const route = require('express').Router()
const { userRegister} = require('../controller/userController')

route.post('/', userRegister)


module.exports = route