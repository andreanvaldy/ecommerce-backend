const express = require('express'); //Framework untuk membuat server dan API.
const passport = require('passport'); //Middleware untuk otentikasi, meskipun belum digunakan dalam file ini.
const orderController = require('../controllers/order.controller'); //Menggunakan fungsi dari order.controller.js untuk memproses order.
const router = express.Router();
const Order = require("../models/order.model"); // Ubah jadi "order.model Model Order yang digunakan untuk operasi database.


console.log("✅ Order routes loaded"); //og untuk memastikan rute ini berhasil di-load.

router.post("/orders", orderController.createOrder); //Rute Menambahkan Order Baru  Menggunakan createOrder dari order.controller.js untuk membuat order baru.

// Route untuk mengambil semua order Rute Mendapatkan Semua Order
router.get("/orders", orderController.getAllOrders); //Backend mencari semua order dalam database.Order dikirim dalam format JSON ke frontend.


 //Rute Menghapus Order Berdasarkan ID
  router.delete("/:id", async (req, res) => { //Mencari order berdasarkan ID,Fungsi: Menghapus order berdasarkan ID yang diberikan di URL.,Jika ditemukan, order dihapus dari database.ika berhasil, mengembalikan pesan sukses { "message": "Order deleted" }.Jika gagal, mengembalikan { "error": "Pesan error" }.
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.json({ message: "Order deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;

//kesimpulan
//Membuat order baru → POST /orders
//Mengambil semua order → GET /orders
//Menghapus order berdasarkan ID → DELETE /orders/:id