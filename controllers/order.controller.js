const Order = require('../models/order.model'); //Mengimpor model Order dari file order.model.js untuk berkomunikasi dengan MongoDB.


exports.createOrder = async (req, res) => { //Fungsi ini menangani pembuatan order baru., Menggunakan async/await agar proses menyimpan data ke MongoDB tidak menghambat request lain.
    try {
        console.log("Data yang diterima dari frontend:", req.body); //Melihat data order yang dikirim frontend di terminal backend.

        const { id, date, total, shippingCost, address, status, items, customer, email } = req.body;
        if (!id || !date || !total || !shippingCost || !address || !status || !items || !customer || !email) { //Validasi input, Jika ada field yang kosong, akan mengembalikan status 400 (Bad Request) dengan pesan error.
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        //Membuat objek newOrder dan menyimpannya ke database
        const newOrder = new Order({ id, date, total, shippingCost, address, status, items, customer, email }); //Membuat objek order baru berdasarkan data yang dikirim frontend.
        await newOrder.save(); //Menyimpan data ke MongoDB dengan .save().

        res.status(201).json({ message: "Order berhasil dibuat!", order: newOrder }); //Mengembalikan respons sukses ke frontend
    } catch (err) {
        console.log("Error saat menyimpan order:", err); //Menangani error jika terjadi kegagalan
        res.status(500).json({ message: err.message });
    }
};


//Mengambil Semua Order
exports.getAllOrders = async (req, res) => { //Fungsi ini menangani pengambilan semua data order dari database.
    try {
        const orders = await Order.find(); //Mengambil semua order dari MongoDB,, Menggunakan .find() tanpa filter → Mengambil semua data order.
        res.status(200).json(orders); //Mengembalikan data order ke frontend
    } catch (err) {
        res.status(500).json({ message: err.message }); //Menangani error jika terjadi kegagalan
    }
};

//seharusnya tidak berada di order.controller.tidak ada kaitan tapi gpp lah

//fung si kode ini Fungsi ini adalah endpoint API yang digunakan untuk mengambil semua produk yang ada di database MongoDB dan mengirimkannya sebagai respons ke frontend.
//Fungsi ini adalah endpoint API yang digunakan untuk mengambil semua produk yang ada di database MongoDB dan mengirimkannya sebagai respons ke frontend.
exports.getProducts = async (req, res) => { //fungsi ini diekspor agar bisa digunakan di file routes., Menggunakan async/await agar operasi database berjalan secara asinkron.
    try {
      const products = await Product.find(); //Mengambil semua produk dari database MongoDB.
      res.json(products); //Mengirimkan daftar produk dalam format JSON sebagai respons ke frontend.
    } catch (error) {
      res.status(500).json({ message: error.message }); //Menangani Error
    }
  };
