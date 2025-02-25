const express = require('express');
const passport = require('passport');
const tagController = require('../controllers/tag.controller');
const router = express.Router();

// Menambahkan tag
router.post('/tags', passport.authenticate('jwt', { session: false }), tagController.createTag);

// Mengambil seluruh tag
router.get('/tags', passport.authenticate('jwt', { session: false }), tagController.getAllTags);

module.exports = router;

//kesimpulan
// ✅ Rute POST /tags → Untuk menambahkan tag baru (hanya pengguna yang login).
// ✅ Rute GET /tags → Untuk mengambil daftar semua tag (juga butuh login).
// ✅ Menggunakan passport.authenticate('jwt', { session: false }) untuk memastikan hanya pengguna terautentikasi yang bisa mengakses API ini.