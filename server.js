const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();


// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());  // Untuk menerima data JSON
app.use(cors());  // Untuk CORS
app.use(passport.initialize());  // Inisialisasi Passport.js



// Connect to MongoDB
connectDB();

// Routes
app.use('/api', require('./routes/product.routes'));
app.use('/api', require('./routes/category.routes'));
app.use('/api', require('./routes/tag.routes'));
app.use('/api', require('./routes/order.routes'));  // Rute untuk Order
app.use('/api', require('./routes/cart.routes'));  // Rute untuk Cart
app.use('/api', require('./routes/invoice.routes'));  // Rute untuk Invoice

// Jalankan server
const PORT = process.env.PORT || 3000;  // Ganti port ke 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

