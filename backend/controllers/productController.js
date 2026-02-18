const Product = require('../models/productModel');


const addProduct = async (req,res)=>{
    try{

        const {...ProductDetails}= req.body;
        const newProduct = await Product.create({
            ...ProductDetails
        })
        res.send({ ...ProductDetails})

    }catch(err){
        res.send({
            status : 404,
            message : "fill all the fields",
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

module.exports ={ addProduct , getProduct , deleteProduct, updateProduct};