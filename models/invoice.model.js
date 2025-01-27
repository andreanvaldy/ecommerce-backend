const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    user: { // Menambahkan informasi pengguna
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
