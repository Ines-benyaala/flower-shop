const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phone: String,
  products: [
    {
      productId: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);