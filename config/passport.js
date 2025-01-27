const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');  // Pastikan path model sudah benar
const dotenv = require('dotenv');  // Pastikan dotenv diimpor jika belum

dotenv.config();  // Memuat variabel environment dari .env

console.log('JWT Strategy loaded');

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
