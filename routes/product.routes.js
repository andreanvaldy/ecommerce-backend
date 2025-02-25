const express = require('express');
const passport = require('passport');
const Product = require('../models/product.model');  // Model Product Anda
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/product.controller');

router.get('/product', getProducts);
router.post('/product', createProduct);



// Rute untuk mendapatkan semua produk
router.get("/product", async (req, res) => {
  try {
    const { category } = req.query; // Mengambil parameter query category
    
    console.log("Kategori yang diterima di backend:", category);
    
  
    // Membuat filter jika kategori diberikan di bawah ini
    let filter = {};
    if (category && category.trim() !== "") {
      filter = { category: category.trim() }; // Jika ada kategori, filter produk berdasarkan kategori tersebut
    }
    
    console.log("Filter yang dikirim ke MongoDB:", filter);
    
    const products = await Product.find(filter); // Mencari produk sesuai filter

    console.log("Produk yang ditemukan:", products); // Log produk yang ditemukan
    
    res.json(products.map(p => ({
      ...p.toObject(),
      price: Number(p.price)  // Pastikan harga dalam bentuk angka
    })));
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});




// routes/product.routes.js
router.post("/product", async (req, res) => {
  try {
    console.log("Data produk yang diterima:", req.body);

    const { name, price, image, category } = req.body; // Ambil data dari request body

    // Cek apakah semua data telah diisi
    if (!name || !price || !image || !category) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }
 
     // Buat produk baru dengan data yang diberikan Membuat instance produk baru
    const newProduct = new Product({ name, price, image, category });
    await newProduct.save(); //Menyimpan produk ke database

    //Memberikan response sukses atau error
    res.status(201).json({ message: "Produk berhasil ditambahkan!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan produk", error: error.message });
  }
});

router.post("/purchase", async (req, res) => {
  try {
    const { productId } = req.body;

    //Mengecek apakah productId dikirimkan
    if (!productId) {
      return res.status(400).json({ message: "ID produk harus ada" });
    }

    //Mengecek apakah produk tersedia di database.
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    //Jika produk ditemukan, mengembalikan response sukses
    res.status(200).json({ message: "Produk berhasil dibeli", product });
  } catch (error) {
    res.status(500).json({ message: "Gagal memproses pembelian", error: error.message });
  }
});

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      const products = await Product.find();
      res.json(products);  // Kirim data produk jika berhasil
  } catch (error) {
      res.status(500).json({ message: 'Server Error' });  // Jika ada error
  }
});


  router.post("/product", async (req, res) => {
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

  // app.get("/api/products/:id", async (req, res) => {
  //   try {
  //     const product = await Product.findById(req.params.id);
  //     if (!product) {
  //       return res.status(404).json({ message: "Produk tidak ditemukan" });
  //     }
  //     res.json(product);
  //   } catch (error) {
  //     res.status(500).json({ message: "Terjadi kesalahan server" });
  //   }
  // });
  
  
  
  

  
  

module.exports = router;
