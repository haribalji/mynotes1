// const express = require("express");
// const Subject = require("../models/Subject");

// const router = express.Router();

// // Get subjects for a specific class
// router.get("/getsubjects/:class", async (req, res) => {
//     try {
//         const classNum = parseInt(req.params.class);
//         const subjects = await Subject.findOne({ class: classNum });

//         if (!subjects) {
//             return res.status(404).json({ error: "No subjects found for this class" });
//         }

//         res.json(subjects);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject"); // Import Subject model

// GET subjects by class
router.get("/:class", async (req, res) => {
    try {
        const classNumber = parseInt(req.params.class); // Get class number from URL
        if (isNaN(classNumber)) {
            return res.status(400).json({ error: "Invalid class number" });
        }
        console.log(classNumber)
        const subjectData = await Subject.findOne({ class: classNumber });

        if (!subjectData) {
            return res.status(404).json({ error: "No subjects found for this class" });
        }
       console.log(subjectData.subjects);
       
        res.json(subjectData.subjects); // Send only the subjects array
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
