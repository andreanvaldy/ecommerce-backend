const Invoice = require('../models/invoice.model'); //Invoice → Model untuk invoice (tagihan)
const Order = require('../models/order.model'); //rder → Model pesanan untuk mendapatkan data pesanan yang akan dibuat invoice-nya.

//Mencari pesanan (Order) berdasarkan orderId
exports.createInvoice = async (req, res) => { 
    try {
        const order = await Order.findById(req.params.orderId); //Menggunakan findById(req.params.orderId) untuk mencari pesanan berdasarkan orderId.
        if (!order) return res.status(404).json({ message: 'Order not found' }); //Jika pesanan tidak ditemukan, kirim status 404 Not Found.


        const invoiceNumber = `INV-${Date.now()}`; //Membuat nomor invoice unik, Menggunakan Date.now() (waktu saat ini dalam milidetik) untuk memastikan nomor invoice unik.
        const invoice = new Invoice({ //Membuat objek Invoice baru
            order: order._id,
            invoiceNumber,
            totalAmount: order.totalAmount,
        });

        await invoice.save(); //Menyimpan invoice ke database
        res.status(201).json(invoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getInvoice = async (req, res) => { //Mencari invoice berdasarkan orderId
    try {
        const invoice = await Invoice.findOne({ order: req.params.orderId }).populate('order'); //findOne({ order: req.params.orderId }) → Mencari invoice berdasarkan orderId. .populate('order') → Mengambil detail pesanan yang terhubung.
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//kesimpulan 

// Menggunakan Order untuk membuat invoice berdasarkan pesanan yang ada.
//  Nomor invoice dibuat unik dengan Date.now().
// Dapat mengambil invoice berdasarkan orderId menggunakan populate().
//  Menangani error jika pesanan atau invoice tidak ditemukan.