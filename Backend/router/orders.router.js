const express = require('express');
const Order = require('../models/order.model');
const OrderController = require('../controllers/order.controller');
const orderrouter = express.Router();

orderrouter.post('/order', OrderController.Order );

module.exports = orderrouter;
