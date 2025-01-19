const Invoice = require('../models/invoice.model');
const Order = require('../models/order.model');

exports.createInvoice = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        const invoiceNumber = `INV-${Date.now()}`;
        const invoice = new Invoice({
            order: order._id,
            invoiceNumber,
            totalAmount: order.totalAmount,
        });

        await invoice.save();
        res.status(201).json(invoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findOne({ order: req.params.orderId }).populate('order');
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
