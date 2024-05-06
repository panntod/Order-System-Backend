const express = require("express");
const route = express.Router();

const { authorization } = require("../middlewares/auth.middleware");

const orderController = require("../controllers/order.controller");
route.post("/", authorization, orderController.addOrder);
route.get("/", authorization, orderController.getAllOrders);

module.exports = route;
