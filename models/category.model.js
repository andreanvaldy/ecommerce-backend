const mongoose = require('mongoose');

// Schema kategori
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
