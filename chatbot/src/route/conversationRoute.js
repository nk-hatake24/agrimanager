const route = require('express').Router()
const {getConversation} = require('../controller/conversationController')

route.get('/', getConversation)



module.exports = route