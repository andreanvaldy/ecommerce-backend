const mongoose = require('mongoose');

// Schema kategori
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
}, { timestamps: true });

// Membuat model berdasarkan schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
