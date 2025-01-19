const express = require('express');
const passport = require('passport');
const categoryController = require('../controllers/category.controller');
const router = express.Router();

// Menambahkan kategori
router.post('/categories', passport.authenticate('jwt', { session: false }), categoryController.createCategory);

// Mengambil seluruh kategori
router.get('/categories', passport.authenticate('jwt', { session: false }), categoryController.getAllCategories);

module.exports = router;
