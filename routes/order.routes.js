const express = require('express');
const passport = require('passport');
const orderController = require('../controllers/order.controller');
const router = express.Router();
const Order = require("../models/order.model"); // Ubah jadi "order.model"


console.log("Order routes loaded");

router.post("/orders", async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ error: "Gagal menyimpan order" });
    }
});

  router.get("/orders", async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

  router.delete("/:id", async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.json({ message: "Order deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
