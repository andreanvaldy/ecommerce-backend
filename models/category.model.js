const mongoose = require('mongoose'); //Import Mongoose,mongoose adalah library ODM (Object Data Modeling) untuk MongoDB.,Digunakan untuk membuat schema dan model dalam database.

// Schema kategori
const categorySchema = new mongoose.Schema({ //new mongoose.Schema({...}) → Membuat struktur data untuk kategori dalam MongoDB.

    name: { type: String, required: true, unique: true },//Wajib diisi, jika kosong akan error.Nama kategori tidak boleh sama dengan kategori lain.
    description: { type: String }
}, { timestamps: true });

// Membuat model berdasarkan schema
const Category = mongoose.model('Category', categorySchema); //mongoose.model('Category', categorySchema)
// Membuat model Category berdasarkan schema categorySchema.
// Model ini akan digunakan untuk operasi CRUD (Create, Read, Update, Delete).



module.exports = Category;


//kesimpulan
// category.model.js digunakan untuk menyimpan data kategori produk di database.
//  Schema ini memastikan bahwa setiap kategori memiliki nama unik dan bisa menyimpan deskripsi.
//  Dengan timestamps: true, MongoDB akan otomatis mencatat kapan kategori dibuat dan diperbarui.