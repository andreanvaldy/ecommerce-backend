const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');  // Pastikan path model sudah benar

// Passport menggunakan JWT strategy untuk autentikasi
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),  // Mengambil JWT dari header authorization
    secretOrKey: process.env.JWT_SECRET,  // Secret key yang disimpan di .env
}, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);  // Cari user berdasarkan ID yang ada di payload JWT
        if (!user) {
            return done(null, false);  // Jika user tidak ditemukan
        }
        return done(null, user);  // Jika user ditemukan
    } catch (error) {
        return done(error, false);  // Jika ada error, return error
    }
}));

module.exports = passport;  // Pastikan passport diexport dengan benar
