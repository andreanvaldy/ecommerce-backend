const express = require('express');
const passport = require('passport');
const Product = require('../models/product.model');  // Model Product Anda
const router = express.Router();

// Rute untuk mendapatkan semua produk
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);  // Mengirimkan daftar produk
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });  // Jika terjadi error
    }
});

module.exports = router;
