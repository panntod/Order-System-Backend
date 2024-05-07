const express = require("express");
const route = express.Router();

const { authorization } = require("../middlewares/auth.middleware");

const foodController = require("../controllers/food.controller");
route.get("/get/", foodController.getAllFood);
route.get("/:search", foodController.findFood);
route.post("/", authorization, foodController.addFood);
route.put("/:id", authorization, foodController.updateFood);
route.delete("/:id", authorization, foodController.deleteFood);

module.exports = route;
