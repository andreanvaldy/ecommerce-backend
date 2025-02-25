const express = require('express'); // Framework untuk membuat server
const mongoose = require('mongoose'); // Library untuk MongoDB
const passport = require('passport'); // Middleware untuk autentikasi
const dotenv = require('dotenv'); // Untuk membaca file .env
const cors = require('cors'); // Middleware agar frontend bisa mengakses backend
const connectDB = require('./config/db');// Import koneksi database
const userRoutes = require('./routes/user.routes');
const bodyParser = require("body-parser");


// Load environment variables
dotenv.config();



const router = express.Router();


const app = express();

module.exports = router;

const productRoutes = require('./routes/product.routes');  // Path sesuai dengan file Anda
mongoose.set('debug', true);



app.use(cors({
  origin: 'http://localhost:5173', // Ganti dengan URL frontend Anda
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Middleware untuk parsing 



app.get('/api/products', (req, res) => {
  const category = req.query.category; // Ambil kategori dari query string
  console.log('Kategori diterima di backend:', category); // Log kategori
  // Lanjutkan dengan logika filter
});


// Menggunakan route untuk path /api/products
app.get('/api/products', async (req, res) => {
  const { category } = req.query;

  try {
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});




app.use('/api', userRoutes);

app.use('/api', require('./routes/user.routes'));

app.get("/api/products", (req, res) => {
    res.status(200).json(products); // Kirimkan daftar produk sebagai JSON
  });
// Koneksi ke MongoDB

// Middleware


app.use(passport.initialize());  // Inisialisasi Passport.js
// Middleware harus dipanggil sebelum routes!// Untuk menerima data JSON dari body request
app.use(express.urlencoded({ extended: true })); // Untuk menerima data dari form

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route.path);  // Mencetak semua route yang terdaftar
  }
});

console.log('Passport initialized');

app.options('*', cors());

// Connect to MongoDB
connectDB();

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`Route terdaftar: ${middleware.route.path}`);
  }
});

// Routes
app.use('/api', require('./routes/product.routes'));
app.use('/api', require('./routes/category.routes'));
app.use('/api', require('./routes/tag.routes'));
app.use('/api', require('./routes/order.routes'));  // Rute untuk Order
app.use('/api', require('./routes/cart.routes'));  // Rute untuk Cart
app.use('/api', require('./routes/invoice.routes'));  // Rute untuk Invoice




// Jalankan server


mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  }); 