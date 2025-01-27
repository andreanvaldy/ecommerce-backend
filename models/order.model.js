const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  date: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, required: true },
  items: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
  }],
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;