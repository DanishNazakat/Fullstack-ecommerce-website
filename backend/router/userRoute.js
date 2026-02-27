const express = require("express");

const router = express.Router();

// router.post('/superAdmin',superAdmin);
router.get('/admin', (req, res) => {
    res.json({
        message: "Welocome Admin",
    })
})
router.get('/user', (req, res) => {
    res.json({
        message: "Welocome User",
    })
})

module.exports = router;
