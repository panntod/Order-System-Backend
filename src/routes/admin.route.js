const express = require("express");
const route = express.Router();

const { authorization } = require("../middlewares/auth.middleware");

const authController = require("../controllers/auth.controller");
route.post("/login", authController.authentication);

const adminController = require("../controllers/admin.controller");
route.get("/getAll", authorization, adminController.getAllAdmin);
route.get("/find/:id", authorization, adminController.findAdmin);
route.post("/add", authorization, adminController.addAdmin);
route.put("/update/:id", authorization, adminController.updateAdmin);
route.delete("/delete/:id", authorization, adminController.deleteadmin);

module.exports = route;
