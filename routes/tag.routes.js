const express = require('express');
const passport = require('passport');
const tagController = require('../controllers/tag.controller');
const router = express.Router();

// Menambahkan tag
router.post('/tags', passport.authenticate('jwt', { session: false }), tagController.createTag);

// Mengambil seluruh tag
router.get('/tags', passport.authenticate('jwt', { session: false }), tagController.getAllTags);

module.exports = router;

