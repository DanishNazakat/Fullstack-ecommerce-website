const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/verifyToken")
const {signup ,login} = require('../controllers/Auth');
const {addProduct , getProduct , deleteProduct ,updateProduct} = require("../controllers/productController");
// const cloudinary = require("../config/cloudinary")

router.post('/signup', signup);
router.post('/login', login);
router.post('/addProduct', authMiddleware ,addProduct)
router.get('/getProduct', getProduct)
router.delete("/delete/:id", deleteProduct);
router.put("/updateProduct/:id", updateProduct);
const upload = require("../controllers/imageUploader")

// router.get("/my", (req, res) => {
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
