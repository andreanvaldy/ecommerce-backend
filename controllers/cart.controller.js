const Cart = require('../models/cart.model');

exports.addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const existingCart = await Cart.findOne({ user: req.user._id });

        if (existingCart) {
            const itemIndex = existingCart.items.findIndex(item => item.product.toString() === product);

            if (itemIndex > -1) {
                existingCart.items[itemIndex].quantity += quantity;
            } else {
                existingCart.items.push({ product, quantity });
            }

            await existingCart.save();
            res.status(200).json(existingCart);
        } else {
            const newCart = new Cart({
                user: req.user._id,
                items: [{ product, quantity }],
            });
            await newCart.save();
            res.status(201).json(newCart);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
