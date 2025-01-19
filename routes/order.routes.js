const express = require('express');
const passport = require('passport');
const orderController = require('../controllers/order.controller');
const router = express.Router();

router.post('/orders', passport.authenticate('jwt', { session: false }), orderController.createOrder);
router.get('/orders', passport.authenticate('jwt', { session: false }), orderController.getAllOrders);

module.exports = router;
