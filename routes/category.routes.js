const express = require('express'); //Framework untuk membuat server backend.
const passport = require('passport'); //Middleware untuk otorisasi menggunakan JWT.
const categoryController = require('../controllers/category.controller'); //Mengimpor controller yang berisi logika CRUD kategori
const router = express.Router(); //Membuat objek router untuk mengelola route terkait kategori.

// Menambahkan kategori
router.post('/categories',
     passport.authenticate('jwt',{ session: false }), //Memastikan hanya user yang sudah login bisa menambahkan kategori. Menggunakan JWT sebagai metode autentikasi.
      categoryController.createCategory); //Memanggil fungsi di category.controller.js untuk memproses data.

// Mengambil seluruh kategori
router.get('/categories', //Menangani HTTP GET request ke /categories untuk mengambil semua kategori.
     passport.authenticate('jwt', { session: false }), //Hanya user yang sudah login yang bisa mengakses daftar kategori.
     categoryController.getAllCategories); //Memanggil fungsi di category.controller.js untuk mengambil semua kategori dari database.

module.exports = router;

//kesimpulan
// category.routes.js adalah file yang menangani API terkait kategori di eCommerce kamu.
//  Menggunakan passport.authenticate('jwt', { session: false }) untuk membatasi akses hanya bagi pengguna yang login.
// Memanggil category.controller.js untuk menangani request dari user.
