// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Product name is required"],
//       trim: true,
//     },

//     description: {
//       type: String,
//       required: [true, "Description is required"],
//     },

//     price: {
//       type: Number,
//       required: [true, "Price is required"],
//       min: 0,
//     },

//     // discountPrice: {
//     //   type: Number,
//     //   min: 0,
//     //   validate: {
//     //     validator: function (value) {
//     //       return value <= this.price;
//     //     },
//     //     message: "Discount price cannot be greater than price",
//     //   },
//     // },

//     // category: {
//     //   type: String,
//     //   required: true,
//     //   trim: true,
//     // },

//     // brand: {
//     //   type: String,
//     //   trim: true,
//     // },

//     // sku: {
//     //   type: String,
//     //   required: [true, "sku is required"],
//     //   unique: true, // har product ka alag SKU hoga
//     // },

//     // stock: {
//     //   type: Number,
//     //   required: true,
//     //   min: 0,
//     //   default: 0,
//     // },

//     // // images: [
//     // //   {
//     // //     type: String, 
//     // //     required : true
//     // //   },
//     // // ],

//     // isActive: {
//     //   type: Boolean,
//     //   default: true,
//     // },
//   },
//   {
//     timestamps: true, // createdAt & updatedAt
//   }
// );

// module.exports = mongoose.model("ecoProduct", productSchema);



const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  description:{
    type:String,
    required:true
  },

  price:{
    type:Number,
    required:true
  },

  // image:{
  //   type:String
  // },

  category:{
    type:String
  },

  stock:{
    type:Number,
    default:0
  }

},{timestamps:true});

module.exports = mongoose.model("ecoProduct",productSchema);