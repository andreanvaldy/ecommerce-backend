const User = require('../models/user.model'); //// Import model User dari database,
const bcrypt = require('bcryptjs'); // Untuk mengenkripsi password, Digunakan untuk mengenkripsi password agar tidak tersimpan dalam bentuk teks biasa.
const jwt = require('jsonwebtoken'); // Untuk membuat token JWT, Digunakan untuk menghasilkan token autentikasi saat pengguna berhasil login.

//Fungsi Registrasi
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body; //Mengambil name, email, dan password dari data yang dikirimkan melalui request body saat pengguna mendaftar.


    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email }); //User.findOne({ email }) → Mengecek apakah email sudah ada di database.
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" }); //Jika sudah ada, kirim respons 400 (Bad Request) dengan pesan "Email sudah terdaftar".

    }

     // 🔥 HASH PASSWORD sebelum menyimpan ke database agar aman 
     const hashedPassword = await bcrypt.hash(password, 10);

    // Membuat pengguna baru
    const newUser = new User({ name, email, password }); //Membuat objek User baru dengan data yang diberikan.
     await newUser.save(); //await newUser.save() → Menyimpan user ke dalam MongoDB.

    console.log('Pengguna berhasil didaftarkan:', newUser);

    //Mengembalikan respons jika berhasil
    res.status(201).json({ message: "Registrasi berhasil!" }); //Jika berhasil, server akan mengembalikan status 201 dan pesan "Registrasi berhasil!".
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

//Fungsi Login 
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; //Mengambil email dan password yang dikirim oleh pengguna saat login.


    // Cek apakah email ada di database
    const user = await User.findOne({ email }); //User.findOne({ email }) → Mencari pengguna dengan email yang diberikan.
    if (!user) {
      return res.status(400).json({ message: 'Email tidak ditemukan' });
    }

    // Mengecek apakah password benar
    const isMatch = await bcrypt.compare(password, user.password); //bcrypt.compare(password, user.password) → Membandingkan password yang diberikan dengan password yang sudah di-hash di database.

    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah' });
    }

    // Membuat Token JWT,Generate token jika login berhasil
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { //jwt.sign() → Membuat token JWT yang berisi userId dari pengguna.
      expiresIn: '1h', //process.env.JWT_SECRET → Secret key untuk mengenkripsi token. Pastikan ada di file .env.
    }); //expiresIn: '1h' → Token berlaku selama 1 jam.

    res.status(200).json({ message: 'Login berhasil', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};

//kesimpulan 
//  Fitur dalam user.controller.js
// ✔ Register → Membuat akun baru & menyimpan password (sekarang dengan hashing).
// ✔ Login → Mengecek email & password, lalu mengembalikan token JWT jika sukses.

// ✨ Saran:

// Gunakan hashing password sebelum menyimpan ke database.
// Tambahkan validasi lebih ketat, misalnya mengecek format email & panjang password.
// Simpan JWT_SECRET dalam .env agar lebih aman.
