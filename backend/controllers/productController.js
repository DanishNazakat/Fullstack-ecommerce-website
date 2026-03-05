const Product = require('../models/productModel');


const addProduct = async (req, res) => {
    try {
        const { name, description, price,category , stock } = req.body;
        if (!name || !description || !price || !category || !stock ) {
            return res.send({
                message: "all Fields required",
                status: 400
            })
        }
        const product = {
            name, description, price , category , stock
        }
        const newProduct = await new Product(product).save();

       res.status(200).json({
        message:"Product created successfully"
       })
    } catch (err) {
        
        res.send({
            massage: "Sorry server not respnding",
            status: 500,
            err
        })
    }
}


const getProduct =async(req , res)=>{
    try{
        const getProduct = await Product.find();
        res.send({
            status:200,
            getProduct,
        })
        console.log(getProduct)
    }catch(err){
        res.send({
            status: 404,
            message : "failed to fetch product"
        })
    }
}


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