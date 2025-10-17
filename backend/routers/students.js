const express = require('express');
// const fetchuser = require('../middleware/fetchdata');
const Student = require("../models/Student"); // Importing the Student model
const { body, validationResult } = require('express-validator');
const { Navigate } = require('react-router-dom');
const fetchuser = require('../middleware/fetchdata');

const router = express.Router();

// ============================
// Route 1: Get all students for the logged-in user
// ============================
router.get('/fetchallstudents', fetchuser, async (req, res) => {
    try {
        const students = await Student.find({ user: req.user.id });
        res.json(students); // ✅ Ensure JSON response
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" }); // ✅ Send JSON, NOT HTML
    }
});
// ============================
// Route 2: Add a new student (User ID auto-assigned)
// ============================
// router.post('/addstudent', fetchuser, [
//     body('name', "Name must be at least 3 characters").isLength({ min: 3 }),
//     body('class', "Class must be a valid number").isNumeric(),
//     body('age', "Age must be a valid number").isNumeric(),
//     body('phone', "Enter a valid phone number").isString().matches(/^\d{10}$/)
// ], async (req, res) => {
//     try {
//         const { name, class:classNum, age, phone } = req.body;

//         // Checking validation errors
//         const result = validationResult(req);
//         if (!result.isEmpty()) {
//             return res.status(400).json({ errors: result.array() });
//         }

//         // Creating a new student record linked to the logged-in user
//         const student = new Student({
//             name, 
//             class: classNum,
//             age, 
//             phone, 
//             user: req.user.id // Assigning logged-in user's ID
//         });

//         const savedStudent = await student.save();
//         res.json(savedStudent);

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

router.post('/addstudent', fetchuser, [
    body('name', "Name must be at least 3 characters").isLength({ min: 3 }),
    body('class', "Class must be a valid number").isNumeric(),
    body('age', "Age must be a valid number").isNumeric(),
    body('phone', "Enter a valid phone number").isString().matches(/^\d{10}$/)
], async (req, res) => {
    console.log("Received Data:", req.body);  // Debugging

    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const { name, class: classNum, age, phone } = req.body;

        const student = new Student({
            name,
            class: classNum,
            age,
            phone: phone.trim(),  // Ensure phone is stored cleanly
            user: req.user.id
        });

        const savedStudent = await student.save();
        res.json({success:true});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



// ============================
// Route 3: Update student (User ID checked for ownership)
// ============================
router.put('/updatestudent/:id', fetchuser, async (req, res) => {
    const { name, class: studentClass, age, phone } = req.body;

    try {
        // Creating an updated student object
        const updatedStudent = {};
        if (name) updatedStudent.name = name;
        if (studentClass) updatedStudent.class = studentClass;
        if (age) updatedStudent.age = age;
        if (phone) updatedStudent.phone = phone;

        // Fetching student by ID
        let student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send("Student not found");
        }

        // Ensuring the logged-in user owns the student record
        if (student.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Updating student record
        student = await Student.findByIdAndUpdate(req.params.id, { $set: updatedStudent }, { new: true });
        res.json(student);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ============================
// Route 4: Delete student (User ID checked for ownership)
// ============================
router.delete('/deletestudent/:id', fetchuser, async (req, res) => {
    try {
        // Fetching student by ID
        let student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send("Student not found");
        }

        // Ensuring the logged-in user owns the student record
        if (student.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Deleting the student record
        await Student.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Student record has been deleted", student });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
// ============================
// Route 5: Check if student is already registered
// ============================
router.get('/checkStudentRegistration', fetchuser, async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user.id });

        if (student) {
            return res.json({ success: true, student });
        } else {
            return res.json({ success: false });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
