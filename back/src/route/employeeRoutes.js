const route = require('express').Router()
const {authenticateJWT, authorizeRoles} = require('../config/auth')
const {employeeRegister, searchAllEmployee, searchOneEmployee, updateEmployee, deleteEmployee, login, test} = require('../controller/employeeController')


route.post("/register",  employeeRegister)
route.get("/", searchAllEmployee)
route.get("/:id", searchOneEmployee)
route.put('/:id', authenticateJWT, authorizeRoles("manager", "admin"), updateEmployee)
route.delete('/:id', authenticateJWT, authorizeRoles("manager", "employee", "admin"),deleteEmployee)
route.post('/login', login)

module.exports = route