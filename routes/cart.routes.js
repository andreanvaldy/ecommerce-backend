const express = require('express');
const passport = require('passport');
const cartController = require('../controllers/cart.controller');
const router = express.Router();

router.post('api/cart', passport.authenticate('jwt', { session: false }), cartController.addToCart);
router.get('api/cart', passport.authenticate('jwt', { session: false }), cartController.getCart);

module.exports = router;
