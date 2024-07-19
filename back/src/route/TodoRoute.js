const route = require('express').Router()
const { authenticateJWT, authorizeRoles } = require('../config/auth')
const {addTodo, getAllTodos, modifyTodo, deleteTodo} =require('../controller/todoController')


route.post("/",authenticateJWT, authorizeRoles("manager", "employee", "admin"), addTodo)
route.get("/", authenticateJWT, authorizeRoles("manager", "employee", "admin"),getAllTodos)
route.put("/:id", authenticateJWT, authorizeRoles("manager", "employee", "admin"),modifyTodo)
route.delete("/:id", authenticateJWT, authorizeRoles("manager", "employee", "admin"),deleteTodo)


module.exports= route
