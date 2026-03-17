const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique naam dene ke liye
    }
});

// File filter (sirf images allow karne ke liye)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Sirf images upload karein!"), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;