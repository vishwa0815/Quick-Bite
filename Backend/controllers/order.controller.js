const express = require('express');
const Order = require('../models/order.model');


module.exports.Order = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error.message);
    }
}