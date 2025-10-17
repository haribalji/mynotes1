// const express = require("express");
// const fetchuser = require('../middleware/fetchdata');
// const StudentNote = require("../models/Studentnote"); // ✅ Correct DB Collection
// const { body, validationResult } = require("express-validator");
// const multer = require("multer");

// const router = express.Router();

// // ⚡ Multer Storage Setup (For File Uploads)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Store files in the 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname); // Unique filename
//     },
// });

// const upload = multer({ storage });

// // 📌 Route 1: Fetch all student notes
// router.get("/fetchallnotes", fetchuser, async (req, res) => {
//     try {
//         const notes = await StudentNote.find({ userId: req.user.id });
//         res.json(notes);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // 📌 Route 2: Add a new student note
// router.post(
//     "/addnotes",
//     fetchuser,
//     [
//         body("subject", "Enter a valid subject").isLength({ min: 3 }),
//         body("chapter", "Chapter must be at least 3 characters").isLength({ min: 3 }),
//     ],
//     async (req, res) => {
//         try {
//             const { classNumber, subject, chapter, notes } = req.body;

//             // Validate request
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }

//             // Create new student note
//             const newNote = new StudentNote({
//                 userId: req.user.id,
//                 classNumber,
//                 subject,
//                 chapter,
//                 notes,
//             });

//             const savedNote = await newNote.save();
//             res.json(savedNote);
//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send("Internal Server Error");
//         }
//     }
// );

// // 📌 Route 3: Update a student note
// router.put("/update/:id", fetchuser, async (req, res) => {
//     const { notes } = req.body;

//     try {
//         let note = await StudentNote.findById(req.params.id);
//         if (!note) {
//             return res.status(404).send("Note not found");
//         }

//         if (note.userId.toString() !== req.user.id) {
//             return res.status(401).send("Not Allowed");
//         }

//         note.notes = notes || note.notes;
//         note = await StudentNote.findByIdAndUpdate(req.params.id, { $set: note }, { new: true });

//         res.json(note);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // 📌 Route 4: Delete a student note
// router.delete("/delete/:id", fetchuser, async (req, res) => {
//     try {
//         let note = await StudentNote.findById(req.params.id);
//         if (!note) {
//             return res.status(404).send("Note not found");
//         }

//         if (note.userId.toString() !== req.user.id) {
//             return res.status(401).send("Not Allowed");
//         }

//         await StudentNote.findByIdAndDelete(req.params.id);
//         res.json({ success: "Note deleted successfully" });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // 📌 Route 5: Upload Photo/Video/Audio for a student note
// router.post("/upload/:noteId", fetchuser, upload.single("file"), async (req, res) => {
//     try {
//         const note = await StudentNote.findById(req.params.noteId);
//         if (!note) return res.status(404).send("Note not found");
//         if (note.userId.toString() !== req.user.id) return res.status(401).send("Not Allowed");

//         const file = {
//             fileName: req.file.filename,
//             fileUrl: `/uploads/${req.file.filename}`,
//             fileType: req.file.mimetype.split("/")[0], // Extract file type (image, video, audio)
//         };

//         note.files.push(file);
//         await note.save();

//         res.json({ success: "File uploaded successfully", file });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // 📌 Route 6: Delete a file from a student note
// router.delete("/deletefile/:noteId/:fileId", fetchuser, async (req, res) => {
//     try {
//         const note = await StudentNote.findById(req.params.noteId);
//         if (!note) return res.status(404).send("Note not found");
//         if (note.userId.toString() !== req.user.id) return res.status(401).send("Not Allowed");

//         note.files = note.files.filter(file => file._id.toString() !== req.params.fileId);
//         await note.save();

//         res.json({ success: "File deleted successfully" });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

// module.exports = router;



// // const express = require("express");/
// // const StudentNote = require("../models/StudentNote");
// // const fetchuser = require('../middleware/fetchdata');
// // const { body, validationResult } = require("express-validator");
// // // 
// // const router = express.Router();

// // // Route 1: Add a new student note
// // router.post(
// //   "/add",
// //   fetchuser,
// //   [
// //     body("title", "Title must be at least 5 characters").isLength({ min: 5 }),
// //     body("description", "Description must be at least 5 characters").isLength({
// //       min: 5,
// //     }),
// //   ],
// //   async (req, res) => {
// //     console.log("hii hiolodf")
// //     const errors = validationResult(req);
// //     console.log(errors);

// //     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

// //     try {
// //       const { classNumber, subject, chapter, title, description, tag } = req.body;
// //       const note = new StudentNote({
// //         user: req.user.id,
// //         classNumber,
// //         subject,
// //         chapter,
// //         title,
// //         description,
// //         tag,
// //       });

// //       const savedNote = await note.save();
// //       res.json(savedNote);
// //     } catch (error) {
// //       console.error(error.message);
// //       res.status(500).json({ error: "Internal Server Error" });
// //     }
// //   }
// // );

// // // Route 2: Get all notes for a specific class, subject, and chapter
// // router.get("/:classNumber/:subject/:chapter", fetchuser, async (req, res) => {
// //   try {
// //     const notes = await StudentNote.find({
// //       user: req.user.id,
// //       classNumber: req.params.classNumber,
// //       subject: req.params.subject,
// //       chapter: req.params.chapter,
// //     });

// //     res.json(notes);
// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // // Route 3: Update a note
// // router.put("/update/:id", fetchuser, async (req, res) => {
// //   const { title, description, tag } = req.body;
// //   try {
// //     let note = await StudentNote.findById(req.params.id);
// //     if (!note) return res.status(404).json({ error: "Note not found" });

// //     // Ensure user owns the note
// //     if (note.user.toString() !== req.user.id)
// //       return res.status(401).json({ error: "Unauthorized" });

// //     // Update fields if provided
// //     if (title) note.title = title;
// //     if (description) note.description = description;
// //     if (tag) note.tag = tag;

// //     const updatedNote = await note.save();
// //     res.json(updatedNote);
// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // // Route 4: Delete a note
// // router.delete("/delete/:id", fetchuser, async (req, res) => {
// //   try {
// //     let note = await StudentNote.findById(req.params.id);
// //     if (!note) return res.status(404).json({ error: "Note not found" });

// //     // Ensure user owns the note
// //     if (note.user.toString() !== req.user.id)
// //       return res.status(401).json({ error: "Unauthorized" });

// //     await StudentNote.findByIdAndDelete(req.params.id);
// //     res.json({ success: "Note deleted successfully" });
// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // module.exports = router;



// const express = require("express");
// const router = express.Router();
// const StudentNote = require("../models/Studentnote");
// const fetchuser = require("../middleware/fetchuser");

// // 📌 1️⃣ Create a new student note
// router.post("/add", fetchuser, async (req, res) => {
//   try {
//     const { classNumber, subject, chapter, title, description, media } = req.body;

//     const newNote = new StudentNote({
//       user: req.user.id,
//       classNumber,
//       subject,
//       chapter,
//       title,
//       description,
//       media,
//     });

//     const savedNote = await newNote.save();
//     res.status(201).json(savedNote);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // 📌 2️⃣ Get all notes for a user
// router.get("/", fetchuser, async (req, res) => {
//   try {
//     const notes = await StudentNote.find({ user: req.user.id });
//     res.json(notes);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // 📌 3️⃣ Get a single note by ID
// router.get("/:id", fetchuser, async (req, res) => {
//   try {
//     const note = await StudentNote.findById(req.params.id);
//     if (!note || note.user.toString() !== req.user.id) {
//       return res.status(404).json({ error: "Note not found" });
//     }
//     res.json(note);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // 📌 4️⃣ Update a note
// router.put("/:id", fetchuser, async (req, res) => {
//   try {
//     const { classNumber, subject, chapter, title, description, media } = req.body;

//     let note = await StudentNote.findById(req.params.id);
//     if (!note || note.user.toString() !== req.user.id) {
//       return res.status(404).json({ error: "Note not found" });
//     }

//     note.classNumber = classNumber || note.classNumber;
//     note.subject = subject || note.subject;
//     note.chapter = chapter || note.chapter;
//     note.title = title || note.title;
//     note.description = description || note.description;
//     note.media = media || note.media;

//     const updatedNote = await note.save();
//     res.json(updatedNote);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // 📌 5️⃣ Delete a note
// router.delete("/:id", fetchuser, async (req, res) => {
//   try {
//     const note = await StudentNote.findById(req.params.id);
//     if (!note || note.user.toString() !== req.user.id) {
//       return res.status(404).json({ error: "Note not found" });
//     }

//     await StudentNote.findByIdAndDelete(req.params.id);
//     res.json({ message: "Note deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const StudentNote = require("../models/StudentNote");
const fetchuser = require("../middleware/fetchuser");
// const fetchuser = require('../middleware/fetchdata');

// 📌 1️⃣ Create a new student note
router.post("/add", fetchuser, async (req, res) => {
  try {
    const { classNumber, subject, chapter, title, description } = req.body;

    const newNote = new StudentNote({
      user: req.user.id, // Fetch authenticated user ID
      classNumber,
      subject,
      chapter,
      title,
      description,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 2️⃣ Get all notes for a user
router.get("/", fetchuser, async (req, res) => {
  try {
    const notes = await StudentNote.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 3️⃣ Get a single note by ID
// router.get("/:id", fetchuser, async (req, res) => {
//   try {
//     const note = await StudentNote.findById(req.params.id);
//     if (!note || note.user.toString() !== req.user.id) {
//       return res.status(404).json({ error: "Note not found" });
//     }
//     res.json(note);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
router.get("/:classNumber/:subject/:chapter", fetchuser, async (req, res) => {
    try {
        const { classNumber, subject, chapter } = req.params;

        // Fetch notes that match the specific class, subject, and chapter
        const notes = await StudentNote.find({
             user: req.user.id  ,
            classNumber, 
            subject, 
            chapter 
        });

        if (!notes.length) {
            return res.status(404).json({ message: "No notes found" });
        }

        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// // 📌 4️⃣ Update a note
// router.put('/update/:id', fetchuser, async (req, res) => {
//   try {
//     const { classNumber, subject, chapter, title, description } = req.body;

//     // Fetch the note by ID
//     let note = await StudentNote.findById(req.params.id);
//     if (!note) {
//       return res.status(404).json({ error: "Note not found" });
//     }

//     // Ensure the logged-in user owns the note
//     if (note.user.toString() !== req.user.id) {
//       return res.status(401).send("Not Allowed");
//     }

//     // Update note fields only if new values are provided
//     if (classNumber) note.classNumber = classNumber;
//     if (subject) note.subject = subject;
//     if (chapter) note.chapter = chapter;
//     if (title) note.title = title;
//     if (description) note.description = description;

//     // Save the updated note
//     const updatedNote = await note.save();

//     res.json({ success: true, message: "Note updated successfully", note: updatedNote });

//   } catch (error) {
//     console.error("Error updating note:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.put('/update/:id', fetchuser, async (req, res) => {
  try {
    const { classNumber, subject, chapter, title, description } = req.body;

    // Create a new note object with updated values
    const updatedNote = {};
    if (classNumber) updatedNote.classNumber = classNumber;
    if (subject) updatedNote.subject = subject;
    if (chapter) updatedNote.chapter = chapter;
    if (title) updatedNote.title = title;
    if (description) updatedNote.description = description;

    // Find the note in the database
    let note = await StudentNote.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Check if the note belongs to the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Allowed" });
    }

    // Update the note
    note = await StudentNote.findByIdAndUpdate(
      req.params.id,
      { $set: updatedNote },
      { new: true } // Returns the updated note
    );

    res.json(note);
  } catch (error) {
    console.error("Error updating student note:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.delete('/delete/:id', fetchuser, async (req, res) => {
  try {
    // Fetch the note by ID from the database
    let note = await StudentNote.findById(req.params.id);
    console.log("Deleting Note with ID:", req.params.id); // Debugging line

    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Check if the logged-in user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // If authorized, delete the note
    note = await StudentNote.findByIdAndDelete(req.params.id);

    res.json({ "Success": "Note has been deleted", note: note });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});



// router.delete("/:id", fetchuser, async (req, res) => {
//   try {
//     const noteId = req.params.id;
//     console.log(noteId)

//     // Validate if ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(noteId)) {
//       return res.status(400).json({ error: "Invalid note ID format" });
//     }

//     // Find the note by ID
//     const note = await StudentNote.findById(noteId);
//     console.log(noteId)
//     // Check if the note exists
//     if (!note) {
//       return res.status(404).json({ error: "Note not found" });
//     }

//     // Check if the note belongs to the authenticated user
//     if (note.user.toString() !== req.user.id) {
//       return res.status(403).json({ error: "Unauthorized: You cannot delete this note" });
//     }

//     // Delete the note
//     await StudentNote.findByIdAndDelete(noteId);
//     res.json({ message: "Note deleted successfully" });

//   } catch (error) {
//     console.error("Error deleting note:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;
