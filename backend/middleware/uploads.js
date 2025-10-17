const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads");
fs.ensureDirSync(uploadDir);

// Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files in `/uploads`
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image", "video", "audio", "application"];
  if (allowedTypes.some((type) => file.mimetype.includes(type))) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Multer Upload Middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
