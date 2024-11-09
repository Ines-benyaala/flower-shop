const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  productUrl: { type: String, required: true },
  price: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
});

module.exports = mongoose.model("Product", productSchema);
