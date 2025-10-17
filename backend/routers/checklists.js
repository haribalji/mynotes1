const express = require("express");
const router = express.Router();
const Checklist = require("../models/Checklist");

// ✅ Create a Checklist
router.post("/", async (req, res) => {
  try {
    const { userId, classNumber, subject, chapter, items } = req.body;
    const newChecklist = new Checklist({ userId, classNumber, subject, chapter, items });
    await newChecklist.save();
    res.status(201).json(newChecklist);
  } catch (err) {
    res.status(500).json({ message: "Error creating checklist", error: err });
  }
});

// 📌 Get Checklist by User, Class, Subject, Chapter
router.get("/:userId/:classNumber/:subject/:chapter", async (req, res) => {
  try {
    const { userId, classNumber, subject, chapter } = req.params;
    const checklist = await Checklist.findOne({ userId, classNumber, subject, chapter });
    res.json(checklist || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching checklist", error: err });
  }
});

router.put("/:userId/:classNumber/:subject/:chapter", async (req, res) => {
  try {
    const { userId, classNumber, subject, chapter } = req.params;
    const { items } = req.body;

    const updatedChecklist = await Checklist.findOneAndUpdate(
      { userId, classNumber, subject, chapter },
      { items },
      { new: true, upsert: true } // 🔥 Upsert creates a new checklist if not found
    );

    res.json(updatedChecklist);
  } catch (err) {
    res.status(500).json({ message: "Error updating checklist", error: err });
  }
});

// ❌ Delete a Checklist
router.delete("/:id", async (req, res) => {
  try {
    await Checklist.findByIdAndDelete(req.params.id);
    res.json({ message: "Checklist deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting checklist", error: err });
  }
});

module.exports = router;
