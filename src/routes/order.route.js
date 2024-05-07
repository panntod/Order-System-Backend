const express = require("express");
const route = express.Router();

const orderController = require("../controllers/order.controller");
route.post("/", orderController.addOrder);
route.get("/", orderController.getAllOrders);

module.exports = route;
