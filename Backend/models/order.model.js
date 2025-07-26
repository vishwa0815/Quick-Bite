const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        foodItem: {
            name: { type: String, required: true },
            image: { type: String },
            price: { type: Number, required: true },
        },
        customizations: { type: Object, default: {} },
        status: { type: String, default: "pending" },
        orderDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
