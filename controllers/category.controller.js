const Category = require('../models/category.model'); //Import Category model,Model Category digunakan untuk berinteraksi dengan database MongoDB.,Model ini berisi skema kategori seperti nama dan deskripsi kategori.

// Menambahkan kategori baru
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body; //Menerima request dari frontend,Data kategori (name, description) dikirim dalam req.body.
        // {
        //     "name": "Elektronik",
        //     "description": "Kategori untuk produk elektronik"
        //   }
          

        //Membuat instance kategori baru,Data dari req.body digunakan untuk membuat objek baru berdasarkan model Category.
        const newCategory = new Category({ name, description });

        await newCategory.save(); //Menyimpan kategori ke database
        res.status(201).json(newCategory); //Mengembalikan respons ke frontend
    } catch (err) {
        res.status(500).json({ message: err.message }); //Menangani error jika terjadi masalah
    }
};

//respon jika berhasil 
// {
//     "_id": "65af4567abcd1234",
//     "name": "Elektronik",
//     "description": "Kategori untuk produk elektronik",
//     "__v": 0
//   }
  

// Mengambil seluruh kategori
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find(); //Mengambil semua kategori dari database,Menggunakan Category.find() untuk mendapatkan semua kategori yang ada.
        res.json(categories); //Mengirim data kategori ke frontend,Jika berhasil, data kategori dikirim dalam bentuk JSON.
    } catch (err) {
        res.status(500).json({ message: err.message }); //Menangani error jika terjadi masalah
    }
};


//kesimpulan
// category.controller.js menangani dua fungsi utama:

// Menambahkan kategori baru → POST /categories
// Mengambil semua kategori → GET /categories