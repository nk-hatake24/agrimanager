const route = require('express').Router()
const {sendMessage, getMessages, getResponse} = require('../controller/messageController')

route.post('/', sendMessage)
route.get('/message', getMessages)
route.get('/response', getResponse)


module.exports = route