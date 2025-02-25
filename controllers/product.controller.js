const Product = require('../models/product.model');

// Menambahkan produk baru Mendefinisikan fungsi createProduct yang akan digunakan untuk menambahkan produk baru ke database.
//Menggunakan async/await karena operasi database bersifat asinkron.
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, shippingCost } = req.body; //Mengambil data dari request body (req.body).
        //Data ini dikirim dari frontend saat pengguna menambahkan produk.

        //cek validasi input..Memeriksa apakah semua field yang diperlukan sudah diisi.
        //Jika ada yang kosong, kembalikan status 400 (Bad Request) dengan pesan error.
        if (!name || !price || !image || !category || shippingCost === undefined) {
            return res.status(400).json({ message: "Semua field harus diisi" });
        }

        // Buat Produk Baru dan Simpan ke Database:
        const newProduct = new Product({ name, description, price, image, category, shippingCost }); //Membuat objek produk baru dengan data dari request.
        await newProduct.save(); //Menggunakan .save() untuk menyimpan produk ke database MongoDB.


        //Kirim Response ke Client Jika berhasil, kirim status 201 (Created) beserta data produk yang baru ditambahkan.
        res.status(201).json({ message: "Produk berhasil ditambahkan!", product: newProduct });
    } catch (err) {
        res.status(500).json({ message: err.message }); //Jika terjadi error, kembalikan status 500 (Internal Server Error) dengan pesan error.
    }
};


// Mengambil seluruh produk
exports.getAllProduct = async (req, res) => {
    try {
        // Ambil Semua Produk dari Database..Menggunakan .find() untuk mengambil semua produk dari koleksi MongoDB.
        const products = await Product.find().populate('category'); //.populate('category'): Jika kategori adalah referensi ke koleksi lain, ini akan mengambil detail kategori daripada hanya ID-nya.
        res.json(products); //Kirim Data Produk ke Client Mengembalikan semua produk dalam format JSON.
    } catch (err) { 
        res.status(500).json({ message: err.message }); //Jika ada error, kirim status 500 dengan pesan error.

    }
};

exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Tambah produk baru
 