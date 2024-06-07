const route = require('express').Router()
const { authenticateJWT, authorizeRoles } = require('../config/auth')
const {addResource, getAllResources, modifyResource, deleteResource} =require('../controller/resourceController')


route.post("/",authenticateJWT, authorizeRoles("manager", "employee", "admin"), addResource)
route.get("/", authenticateJWT, authorizeRoles("manager", "employee", "admin"),getAllResources)
route.put("/:id", authenticateJWT, authorizeRoles("manager", "employee", "admin"),modifyResource)
route.delete("/:id", authenticateJWT, authorizeRoles("manager", "employee", "admin"),deleteResource)


module.exports= route
