const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
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
