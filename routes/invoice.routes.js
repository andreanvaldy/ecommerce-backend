const express = require('express');
const passport = require('passport');
const invoiceController = require('../controllers/invoice.controller');
const router = express.Router();

router.post('/invoices/:orderId', passport.authenticate('jwt', { session: false }), invoiceController.createInvoice);
router.get('/invoices/:orderId', passport.authenticate('jwt', { session: false }), invoiceController.getInvoice);

module.exports = router;
