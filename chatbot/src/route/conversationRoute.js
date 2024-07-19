const route = require('express').Router()
const {getConversation, addcConversation} = require('../controller/conversationController')

route.get('/', getConversation)
route.post('/', addcConversation)



module.exports = route