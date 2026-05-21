const express = require("express");

const { uploadImage, getImages } = require("../controllers/imageController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const upload = require("../config/multer");

const router = express.Router();

router.post("/upload", protect, adminOnly, upload.single("image"), uploadImage);

router.get("/", protect, getImages);

module.exports = router;
