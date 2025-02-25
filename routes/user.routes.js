const express = require('express');//Framework untuk membuat route (rute) API.
const userController = require('../controllers/user.controller'); //Mengimpor controller (user.controller.js) untuk menangani logika register dan login.
const router = express.Router(); // Membuat objek router untuk menangani route pengguna.

router.post('/Register', userController.register); //Route untuk Registrasi
router.post('/Login', userController.login); //Route untuk Login

module.exports = router;

//kesimpulan
// ✅ Fungsi dalam user.routes.js
// ✔ Menyediakan route untuk registrasi (POST /register).
// ✔ Menyediakan route untuk login (POST /login).
// ✔ Menghubungkan request dengan controller (user.controller.js).

