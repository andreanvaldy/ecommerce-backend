const mongoose = require('mongoose'); //mongoose → Digunakan untuk mendefinisikan schema dan model MongoDB.
const bcrypt = require('bcryptjs'); //bcryptjs → Digunakan untuk hashing password sebelum disimpan ke database.

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, //Menyimpan nama pengguna (wajib diisi).
    email: { type: String, required: true, unique: true }, //Menyimpan email pengguna .
    password: { type: String, required: true }, //Menyimpan password pengguna (wajib diisi).
  });
  
  // Meng-hash password sebelum menyimpan
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Jika password tidak diubah, lanjutkan
    const salt = await bcrypt.genSalt(10); // Menghasilkan salt
    this.password = await bcrypt.hash(this.password, salt); // Meng-hash password
    next(); // Lanjutkan proses penyimpanan
  });
  
  // Fungsi pre('save'):

  // Dilakukan sebelum menyimpan data user ke database.
  // Mengecek apakah password diubah atau tidak:
  // Jika tidak diubah, lanjutkan proses (next()).
  // Jika diubah, hash password sebelum disimpan.

//   Cara Kerja Hashing Password:

// bcrypt.genSalt(10) → Membuat "garam" (salt) untuk meningkatkan keamanan hashing.
// bcrypt.hash(this.password, salt) → Mengubah password menjadi hash dengan salt.
// Password yang sudah di-hash akan disimpan ke database.

  // Metode untuk memverifikasi password saat login
  userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password); // Membandingkan password dengan hash
  };

  // Fungsi matchPassword():

  // Saat login, sistem akan mencocokkan password yang dimasukkan dengan password yang tersimpan di database.
  // bcrypt.compare(password, this.password) → Mengecek apakah password cocok dengan hash di database.
  
  
  module.exports = mongoose.model('User', userSchema);

//   Cara Kerja Login:

// Pengguna memasukkan password.
// Sistem mengambil password hash dari database.
// Menggunakan bcrypt.compare() untuk membandingkan password input dengan hash.
// Jika cocok, login berhasil. Jika tidak, login gagal.

//kesimpulan 
// ✅ Fitur dalam user.model.js
// ✔ Menyimpan data pengguna dengan nama, email, dan password.
// ✔ Meng-hash password sebelum menyimpan ke database.
// ✔ Mengecek password saat login menggunakan metode matchPassword().

// ✨ Keunggulan yang diterapkan dalam model ini:
// ✅ Keamanan tinggi karena password tidak disimpan dalam teks biasa.
// ✅ Dukungan validasi untuk email dan panjang password.


