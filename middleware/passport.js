const express = require('express');
const passport = require('passport');
const router = express.Router();
const Product = require('../models/product.model');

// Rute yang membutuhkan autentikasi JWT
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);  // Kirim data produk jika berhasil
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });  // Jika ada error
    }
});

module.exports = router;
