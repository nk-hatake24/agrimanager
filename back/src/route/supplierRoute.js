const route = require('express').Router()

const { authenticateJWT, authorizeRoles } = require('../config/auth')
const {addSupplier, getAllSuppliers, updateSupplier} = require('../controller/supplierContoller')

route.post('/', authenticateJWT, authorizeRoles("manager",'admin'),addSupplier)
route.put('/:id_supplier',authenticateJWT, authorizeRoles("manager", "admin"), updateSupplier)
route.get('/', authenticateJWT, authorizeRoles("manager", "employee", "admin"),getAllSuppliers)


module.exports = route