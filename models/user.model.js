const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  // Meng-hash password sebelum menyimpan
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Jika password tidak diubah, lanjutkan
    const salt = await bcrypt.genSalt(10); // Menghasilkan salt
    this.password = await bcrypt.hash(this.password, salt); // Meng-hash password
    next(); // Lanjutkan proses penyimpanan
  });
  
  // Metode untuk memverifikasi password saat login
  userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password); // Membandingkan password dengan hash
  };
  
  
  module.exports = mongoose.model('User', userSchema);