const route = require('express').Router()
const {sendMessage} = require('../controller/messageController')

route.post('/', sendMessage)

module.exports = route