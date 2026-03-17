const mongoose = require("mongoose");

// models/Product.js
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // 👈 Isay 'image' rakhein, 'images' nahi
  category: { type: String },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("ecoProduct", productSchema);