const express = require("express");
const route = express.Router()

const authController = require("../controllers/auth.controller")
route.post("/login", authController.authentication)

const adminController = require("../controllers/admin.controller")
route.get("/getAll", adminController.getAllAdmin)
route.get("/find/:id", adminController.findAdmin)
route.post("/add", adminController.addAdmin)
route.put("/update/:id", adminController.updateAdmin)
route.delete("/delete/:id", adminController.deleteadmin)

module.exports = route;