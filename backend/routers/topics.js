const express = require("express");
const router = express.Router();
const ImportantTopic = require("../models/Importantchaptopic"); // Import the model
const fetchuser = require('../middleware/fetchdata');

// Route to fetch important topics for a specific class, subject, and chapter
router.get("/:classNumber/:subject/:chapter", async (req, res) => {
    try {
        const { classNumber, subject, chapter } = req.params;

        // Find topics that match the given subject and chapter
        const topics = await ImportantTopic.findOne({ subject, chapter });

        if (!topics) {
            return res.status(404).json({ message: "Topics not found" });
        }
        console.log( topics.topics)
        res.json({ topics: topics.topics });
    } catch (error) {
        console.error("Error fetching topics:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
// for displaying the important topic