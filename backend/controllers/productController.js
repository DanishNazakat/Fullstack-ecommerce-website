


const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinary");



const addProduct = async (req, res) => {
    try {
        // Form-data se data req.body mein aata hai
        const { name, description, price, category, stock } = req.body;

        if (!name || !price) {
            return res.status(400).json({ success: false, message: "Name aur Price zaroori hain!" });
        }

        let imageUrl = "";

        // Agar Multer ne file pakri hai, to Cloudinary par bhejein
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url; // Cloudinary ka link
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            image: imageUrl
        });

        await newProduct.save();
        res.status(200).json({ success: true, message: "Product created successfully!" });

    } catch (err) {
        console.error("Add Product Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


// Get All Products Controller
const getProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    // Console mein check karein ke 'image' field mein Cloudinary URL hai ya nahi
    console.log("Products from DB:", products); 
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// const Product = require("../models/productModel");

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


const updateProduct = async(req, res)=>{
    const productId = req.params.id;
    console.log(productId);
    const updateprod = await Product.findOneAndReplace({ _id: productId },req.body,{new:true})
      res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updateprod,
    });
    
}


const getProductById = async (req, res) => {
  try {

    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports ={ addProduct , getProduct , deleteProduct, updateProduct, getProductById};