const express = require('express');
const passport = require('passport');
const Product = require('../models/product.model');  // Model Product Anda
const router = express.Router();



// Rute untuk mendapatkan semua produk
router.get('/product', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);  // Mengirimkan daftar produk
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });  // Jika terjadi error
    }
});


// routes/product.routes.js
router.post("/", async (req, res) => {
    try {
        console.log("DEBUGGING: Headers Request:", req.headers);
        console.log("DEBUGGING: Body Request:", req.body);  // Tambahkan debug
        
        console.log('Data yang diterima:', req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body kosong atau tidak terbaca" });
        }

        const { name, price, image, category } = req.body;
        
        if (!name || !price || !image || !category) {
            return res.status(400).json({ message: "Semua field harus diisi" });
        }
        
        const newProduct = new Product({ name, price, image, category });
        await newProduct.save();
    
        res.status(201).json({ message: "Produk berhasil ditambahkan!", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan produk", error: error.message });
    }
});

router.post("/purchase", async (req, res) => {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'ID produk harus ada' });
    }

    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
      });
    
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Produk tidak ditemukan' });
      }
  
      // Lakukan pemrosesan lebih lanjut (misalnya, update status produk atau simpan transaksi)
      res.status(200).json({ message: 'Produk berhasil dibeli', product });
    } catch (error) {
      res.status(500).json({ message: 'Gagal memproses pembelian', error: error.message });
    }
  });

  router.post("/products", async (req, res) => {
    console.log('Data produk yang diterima:', req.body);
    if (!req.body.name || !req.body.price || !req.body.image || !req.body.category) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }
  
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category,
    });
  
    try {
      await newProduct.save();
      res.status(201).json({ message: 'Produk berhasil ditambahkan', product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Gagal menambahkan produk', error: error.message });
    }
  });
  
  router.post("/products", async (req, res) => {
    console.log("Data yang diterima:", req.body);  // Cek apakah data diterima dengan benar
  
    // Validasi data yang diterima
    if (!req.body.name || !req.body.price || !req.body.image || !req.body.category) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }
  
    // Membuat produk baru
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category,  // Pastikan kategori juga dikirim
    });
  
    try {
      // Simpan produk ke database
      await newProduct.save();
      res.status(201).json({ message: "Produk berhasil ditambahkan", product: newProduct });
    } catch (error) {
      console.error("Error saat menyimpan produk:", error);
      res.status(500).json({ message: "Gagal menambahkan produk", error: error.message });
    }
  });
  

  
  

module.exports = router;
