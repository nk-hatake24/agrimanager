const route = require('express').Router()
const { authenticateJWT, authorizeRoles } = require('../config/auth')
const {addProduct, getAllProducts, modifyProduct, deleteProduct} =require('../controller/productController')


route.post("/",authenticateJWT, authorizeRoles("manager", "employee", "admin"), addProduct)
route.get("/", authenticateJWT, authorizeRoles("manager", "employee", "admin"),getAllProducts)
route.put("/:id", authenticateJWT, authorizeRoles("manager", "employee", "admin"),modifyProduct)
route.delete("/:id", authenticateJWT, authorizeRoles("manager", "employee", "admin"),deleteProduct)


module.exports= route