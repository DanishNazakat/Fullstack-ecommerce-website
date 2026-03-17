const mongoose = require("mongoose");

// Zaroori: Agar Product model register nahi hai, toh usey yahan import karlein
// require("./Product"); 

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', // Yeh naam aapke Product model ke name se match hona chahiye
        required: true 
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);