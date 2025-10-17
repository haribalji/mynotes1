const mongoose = require("mongoose");

const StudentMediaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  classNumber: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    enum: ["image", "video", "audio", "document"], // Supported file types
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudentMedia", StudentMediaSchema);
