const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/verifyToken")
const {signup ,login} = require('../controllers/Auth');
const {addProduct , getProduct , deleteProduct ,updateProduct} = require("../controllers/productController");


router.post('/signup', signup);
router.post('/login', login);
router.post('/addProduct', authMiddleware ,addProduct)
router.get('/getProduct', getProduct)
router.delete("/delete/:id", deleteProduct);
router.put("/updateProduct/:id", updateProduct);

router.get("/dashboard",authMiddleware, (req, res) => {
  res.json({
    message: `Welcome ${req.user.id}, This is a protected dashboard route!`
  });
});



router.get("/publicDashboard", (req, res) => {
  res.json({
    message: `Welcome  This is a public dashboard route!`
  });
});
module.exports = router
