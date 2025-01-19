const Order = require('../models/order.model');

exports.createOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;
        const newOrder = new Order({
            user: req.user._id,  // Mengambil user dari Passport.js
            products,
            totalAmount,
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.product');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
