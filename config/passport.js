const passport = require('passport'); //Library untuk mengelola autentikasi.
const JWTStrategy = require('passport-jwt').Strategy; 
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');  // Pastikan path model sudah benar
const dotenv = require('dotenv');  // Pastikan dotenv diimpor jika belum

dotenv.config();  // Memuat variabel environment dari .env ungsinya: Membaca variabel lingkungan yang ada di file .env, seperti JWT_SECRET.

console.log('JWT Strategy loaded'); //Menampilkan Log Saat JWT Strategy Dimuat

// Konfigurasi Passport untuk menggunakan JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_secret_key', // Ganti dengan secret key Anda
  };
// Passport menggunakan JWT strategy untuk autentikasi
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id); // Sesuaikan field id dengan isi token Anda
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );

module.exports = passport;  // Pastikan passport diexport dengan benar

//penjelasannya

// Menggunakan passport-jwt untuk verifikasi JWT.
// Menggunakan ExtractJwt.fromAuthHeaderAsBearerToken() → Token diambil dari header Authorization: Bearer <token>.
// Menggunakan secretOrKey dari .env → Digunakan untuk verifikasi JWT.
// Strategi jwt akan mencari user berdasarkan userId yang terdapat dalam token.
// Jika user ditemukan, maka akses diberikan.

// ✔ passport.js menangani autentikasi dengan JWT.
// ✔ Mengambil token dari header HTTP (Bearer <token>).
// ✔ Memverifikasi pengguna berdasarkan ID di token JWT.
// ✔ Menggunakan passport.authenticate('jwt', { session: false }) di route yang membutuhkan autentikasi.
