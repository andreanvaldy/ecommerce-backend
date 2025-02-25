const Cart = require('../models/cart.model');

//Menambahkan Produk ke Keranjang
exports.addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body; //Mengambil data product dan quantity dari request body.
        const existingCart = await Cart.findOne({ user: req.user._id }); //Mencari apakah ada keranjang belanja (Cart) yang sudah dibuat untuk pengguna (req.user._id).

        if (existingCart) { //ika keranjang sudah ada, periksa apakah produk yang ingin ditambahkan sudah ada dalam keranjang.
            const itemIndex = existingCart.items.findIndex(item => item.product.toString() === product); //findIndex akan mencari posisi item di dalam array items berdasarkan ID produk.

            if (itemIndex > -1) {
                existingCart.items[itemIndex].quantity += quantity; //Jika produk sudah ada di keranjang, update jumlah (quantity) produk tersebut., ika produk belum ada, tambahkan produk baru ke dalam array items.
            } else {
                existingCart.items.push({ product, quantity }); 
            }

            await existingCart.save(); //Simpan perubahan ke database dan kirim kembali data keranjang yang diperbarui ke frontend.
            res.status(200).json(existingCart);
        } else {
            const newCart = new Cart({ //Jika keranjang belum ada, buat keranjang baru dan tambahkan produk pertama. Simpan ke database lalu kirim response dengan status 201 (Created).
                user: req.user._id,
                items: [{ product, quantity }],
            });
            await newCart.save();
            res.status(201).json(newCart);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Mengambil Data Keranjang
exports.getCart = async (req, res) => { //Cari data keranjang berdasarkan user ID
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product'); //populate('items.product') digunakan agar data produk yang tersimpan di dalam array items akan dimuat secara lengkap dari database.
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 1.addToCart
//    Jika keranjang belum ada → buat baru.
//    Jika produk sudah ada → tambah jumlahnya.
//     Jika produk belum ada → tambahkan ke array items.

// 2.getCart
//    Mengambil semua produk yang ada dalam keranjang pengguna dan mengembalikan data lengkapnya.