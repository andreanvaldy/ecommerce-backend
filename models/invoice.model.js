const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({ //Schema ini menentukan struktur data yang akan disimpan dalam koleksi invoices.
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    // user: { // Menambahkan informasi pengguna
    //     name: { type: String, required: true },
    //     email: { type: String, required: true, unique: true },
    //     password: { type: String, required: true }
    // }
});

module.exports = mongoose.model('Invoice', invoiceSchema); //mongoose.model('Invoice', invoiceSchema); → Membuat model MongoDB dengan nama koleksi invoices.

//kesimpulan
//  Schema ini menghubungkan Invoice ke Order dengan ObjectId
//  Nomor invoice unik agar tidak ada duplikasi
//  Total pembayaran dan tanggal dibuat otomatis
// Menyimpan data pengguna (tetapi lebih baik menggunakan referensi ke users)
