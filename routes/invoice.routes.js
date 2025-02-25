const express = require('express');
const passport = require('passport');
const invoiceController = require('../controllers/invoice.controller');
const router = express.Router();

router.post('/invoices/:orderId', passport.authenticate('jwt', { session: false }), invoiceController.createInvoice);
router.get('/invoices/:orderId', passport.authenticate('jwt', { session: false }), invoiceController.getInvoice);

module.exports = router;

//  Hanya user yang sudah login bisa mengakses rute ini
//  Invoice dibuat berdasarkan orderId
//  Invoice bisa diambil berdasarkan orderId

//  Jika invoice tidak muncul meskipun order sudah ada, mungkin ada masalah pada invoice.controller.js atau database.
