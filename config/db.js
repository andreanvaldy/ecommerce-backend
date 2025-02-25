const mongoose = require('mongoose'); //Library untuk berkomunikasi dengan MongoDB.
const dotenv = require('dotenv'); //Digunakan untuk membaca variabel lingkungan dari .env (misalnya, MONGO_URI).

dotenv.config();//Memuat Konfigurasi dari .env

//Fungsi untuk Menghubungkan ke Database
const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", { //Mongoose connect() untuk menghubungkan ke MongoDB
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("✅ MongoDB Connected");
    } catch (error) {
      console.error("❌ Error connecting to MongoDB:", error);
      process.exit(1); // Keluar dari proses jika gagal koneksi
    }
  };

module.exports = connectDB;


// ✔ db.js menangani koneksi MongoDB dengan Mongoose.
// ✔ Menggunakan .env agar lebih fleksibel.
// ✔ Jika koneksi gagal, aplikasi akan berhenti (process.exit(1)).
// ✔ Fungsi ini bisa dipanggil di server.js untuk menghubungkan database.
