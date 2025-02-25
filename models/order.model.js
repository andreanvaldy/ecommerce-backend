const mongoose = require("mongoose"); //Mengimpor mongoose → Library yang digunakan untuk berinteraksi dengan MongoDB.

//Membuat schema → Struktur data pesanan (Order) yang akan disimpan dalam MongoDB.
const orderSchema = new mongoose.Schema({ //{ timestamps: true } → Secara otomatis menambahkan createdAt dan updatedAt.
  id: { type: String, required: true, unique: true }, //id (ID Pesanan)
  date: { type: Date, required: true, default: Date.now }, //date (Tanggal Pesanan)
  total: { type: Number, required: true }, //total (Total Harga Pesanan)
  shippingCost: { type: Number, required: true }, //shippingCost (Biaya Pengiriman)
  address: { type: String, required: true }, // address (Alamat Pengiriman)
  status: { type: String, required: true, enum: ["Pending", "Completed", "Cancelled"] }, //status (Status Pesanan)
  items: [ //items (Daftar Barang yang Dibeli)
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }, // Jumlah produk yang dibeli.
      image: { type: String, required: true },
    },
  ],
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema, "orders"); // Membuat Model Mongoose, Membuat model Order berdasarkan orderSchema., Nama koleksi dalam MongoDB adalah "orders".

module.exports = Order;


//kesimpulan
//Schema Order mendefinisikan pesanan dengan detail lengkap
//  Memastikan pesanan memiliki data yang valid
// Mendukung multiple produk dalam satu order
//  Menyimpan otomatis waktu pembuatan & update (timestamps: true)