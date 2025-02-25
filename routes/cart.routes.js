const express = require('express'); //digunakan untuk membuat router.
const passport = require('passport'); //digunakan untuk autentikasi JWT agar hanya user yang login bisa mengakses keranjang.
const cartController = require('../controllers/cart.controller');//menghubungkan dengan fungsi handler di cart.controller.js.
const router = express.Router();

router.post('/api/cart', passport.authenticate('jwt', { session: false }), cartController.addToCart); //Route Menambah Produk ke Keranjang

router.get('/api/cart', passport.authenticate('jwt', { session: false }), cartController.getCart);//Route Mendapatkan Isi Keranjang

module.exports = router;
