const Order = require("../models/Order");
const Product = require("../models/productModel");


const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address } = req.body;

        // req.user.id wahan se aa rahi hai jo login mein jwt.sign ki thi
        const newOrder = new Order({
            user: req.user.id, 
            items,
            totalAmount,
            address
        });

        await newOrder.save();
        res.status(201).json({ success: true, message: "Order placed!", order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    // Check karein ke ID sahi format mein hai
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );

    if (!order) {
        return res.status(404).json({ success: false, message: "Order nahi mila" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserOrders = async (req, res) => {
    try {
        // Pehle check karein ke models register hain
        const orders = await Order.find({ user: req.user.id })
            .populate({
                path: 'items.product',
                model: 'ecoProduct' // Explicitly model name batayein
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = { createOrder , updateOrder , getUserOrders } ;