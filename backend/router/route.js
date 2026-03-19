const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/verifyToken");
const authorizeRoles = require('../middleware/roleMiddleware')
const createAdmin = require("../controllers/createAdmin")
const {signup ,login , getAllUsers , deleteUser, updateUser} = require('../controllers/Auth');
const {createOrder , updateOrder ,getUserOrders}= require("../controllers/orderController");
const {addProduct , getProduct , deleteProduct ,updateProduct ,getProductById  } = require("../controllers/productController");
const upload = require("../controllers/imageUploader");
// const cloudinary = require("../config/cloudinary")

router.post('/signup', signup);
router.post('/createAdmin', createAdmin);
router.post('/login', login);
router.get("/allUser", authMiddleware, authorizeRoles("admin"), getAllUsers);
router.put("/updateUser/:id", authMiddleware, authorizeRoles("admin"),updateUser);
router.delete("/deleteUser/:id", authMiddleware, authorizeRoles("admin"),deleteUser);
// router.post('/addProduct', authMiddleware,authorizeRoles("admin") ,addProduct)
router.get('/getProduct',authMiddleware,authorizeRoles("admin","manager","user"), getProduct)
router.delete("/delete/:id",authMiddleware,authorizeRoles("admin","manager"), deleteProduct);
router.put("/updateProduct/:id",authMiddleware,authorizeRoles("admin","manger"), updateProduct);
router.get("/getProductById/:id",authMiddleware,authorizeRoles("admin","manger"), getProductById);
router.post('/orders', authMiddleware, createOrder);
// ✅ Sahi Order: Pehle upload middleware, phir controller
router.post('/addProduct', authMiddleware, authorizeRoles("admin"), upload.single('image'), addProduct);
// router/route.js
// Saare orders dekhne ke liye (Sirf Admin ke liye authMiddleware aur authorizeRoles laga dein)
router.get('/orders', authMiddleware, authorizeRoles("admin"), async (req, res) => {
  try {
    const Order = require("../models/Order");
    const orders = await Order.find().sort({ createdAt: -1 }); // Newest first
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/orders/:id', authMiddleware, authorizeRoles("admin"), updateOrder)
router.get('/getOrders', authMiddleware, getUserOrders);
// router.get("/my", (req, res) => {x
//   res.json({ message: "Route working" })
// })
// router.post('/upload', upload.single('image'),async (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     // res.send(`File uploaded successfully: ${req.file.filename}`);
//       try {
//     const result = await cloudinary.uploader.upload(req.file.path);

//     res.json({
//       success: true,
//       imageUrl: result.secure_url,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/dashboard",authMiddleware, (req, res) => {
//   res.json({
//     message: `Welcome ${req.user.id}, This is a protected dashboard route!`
//   });
// });



// router.get("/publicDashboard", (req, res) => {
//   res.json({
//     message: `Welcome  This is a public dashboard route!`
//   });
// });
module.exports = router
