const express = require("express");
const router = express.Router();
const StudentMedia = require("../models/studentmedia");
const fetchuser = require("../middleware/fetchuser");
const upload = require("../middleware/uploads");
const fs = require("fs-extra");
const path = require("path");

// 📌 Route 1: Upload a Media File
router.post("/upload", fetchuser, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { classNumber, subject, chapter, fileType } = req.body;

    const newMedia = new StudentMedia({
      user: req.user.id,
      classNumber,
      subject,
      chapter,
      fileType,
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
    });

    await newMedia.save();
    res.json({ message: "File uploaded successfully", media: newMedia });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Route 2: Fetch Media Files
router.get("/:classNumber/:subject/:chapter", fetchuser, async (req, res) => {
  try {
    const { classNumber, subject, chapter } = req.params;
    const media = await StudentMedia.find({ classNumber, subject, chapter, user: req.user.id });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Route 3: Delete a Media File
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    const media = await StudentMedia.findById(req.params.id);
    if (!media) return res.status(404).json({ error: "File not found" });

    if (media.user.toString() !== req.user.id) return res.status(401).json({ error: "Not Allowed" });

    await StudentMedia.findByIdAndDelete(req.params.id);

    // Remove the file from server
    fs.removeSync(path.join(__dirname, "..", media.filePath));

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
