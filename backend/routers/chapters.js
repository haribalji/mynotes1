const express = require("express");
const router = express.Router();
const Chapter = require("../models/Chapter");

// GET chapters by class and subject
router.get("/:class/:subject", async (req, res) => {
    try {
        const { class: classNumber, subject } = req.params;
        const chapterData = await Chapter.findOne({ class: parseInt(classNumber), subject });

        if (!chapterData) {
            return res.status(404).json({ error: "No chapters found for this subject and class" });
        }

        res.json(chapterData.chapters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
