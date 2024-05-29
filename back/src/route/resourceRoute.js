const route = require('express').Router()
const {addResource, getAllResources, modifyResource, deleteResource} =require('../controller/resourceController')


route.post("/", addResource)
route.get("/", getAllResources)
route.put("/:id", modifyResource)
route.delete("/:id", deleteResource)


module.exports= route
