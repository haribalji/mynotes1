// // const mongoose = require("mongoose");
// // const Subject = require("../models/Subject"); // Import the Subject model
// // // const Subject = require("../models/Subject"); // Import the Subject model

// // // MongoDB Connection
// // // const mongoURI = 'mongodb://localhost:27017/mynotes'; // Specify your database name
// // const mongoURI ='mongodb+srv://haribalaji17072004:123456hari@cluster0.b21vp.mongodb.net/mynotes'

// // // const mongoURI = "mongodb://127.0.0.1:27017/schoolDB"; // Change database name if needed
// // mongoose.connect(mongoURI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// // });

// // mongoose.connection.on("connected", () => console.log("✅ Connected to MongoDB"));
// // mongoose.connection.on("error", (err) => console.error("❌ MongoDB connection error:", err));

// // // Subject data for classes 1 to 12
// // const subjectsData = [
// //     { class: 1, subjects: ["Tamil", "English", "Mathematics", "Environmental Studies"] },
// //     { class: 2, subjects: ["Tamil", "English", "Mathematics", "Environmental Studies"] },
// //     { class: 3, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
// //     { class: 4, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
// //     { class: 5, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
// //     { class: 6, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
// //     { class: 7, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
// //     { class: 8, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
// //     { class: 9, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science", "Computer Science"] },
// //     { class: 10, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science", "Computer Science"] },
    
// //     // Higher Secondary Stream (Students select Science, Commerce, or Arts group)
// //     { class: 11, subjects: ["Tamil", "English", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Commerce", "Economics", "Accountancy"] },
// //     { class: 12, subjects: ["Tamil", "English", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Commerce", "Economics", "Accountancy"] }
// // ];

// // // Insert subjects into database
// // const insertSubjects = async () => {
// //     try {
// //         await Subject.insertMany(subjectsData);
// //         console.log("✅ Subjects inserted successfully!");
// //     } catch (error) {
// //         console.error("❌ Error inserting subjects:", error);
// //     } finally {
// //         mongoose.connection.close(); // Close DB connection after inserting
// //     }
// // };

// // insertSubjects();

























// // insertsubject.js
const mongoose = require("mongoose");
const Subject = require("../models/Subject"); // Import the Subject model
// const Subject = require("../models/Subject"); // Import the Subject model

// MongoDB Connection
// const mongoURI = 'mongodb://localhost:27017/mynotes'; // Specify your database name
// const mongoURI ='mongodb+srv://haribalaji17072004:123456hari@cluster0.b21vp.mongodb.net/mynotes'

const mongoURI ="mongodb://localhost:27017/mynotes"

// const mongoURI = "mongodb://127.0.0.1:27017/schoolDB"; // Change database name if needed
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("✅ Connected to MongoDB"));
mongoose.connection.on("error", (err) => console.error("❌ MongoDB connection error:", err));
// await collection.drop();








// const { MongoClient } = require("mongodb");

// const uri = "your_mongodb_connection_string"; // Replace with your actual connection string
// const client = new MongoClient(uri);

// async function deleteAllDocuments() {
//   try {
//     await client.connect();
//     const database = client.db("mynotes"); // Replace with your database name
//     const collection = database.collection("subjects"); // Replace with your collection name

//     const result = await collection.deleteMany({});
//     console.log(`${result.deletedCount} document(s) deleted.`);
//   } catch (error) {
//     console.error("Error deleting documents:", error);
//   } finally {
//     await client.close();
//   }
// }

// // Call the function
// deleteAllDocuments();





// Subject data for classes 1 to 12
const subjectsData = [
    // { class: 1, subjects: ["Tamil", "English", "Mathematics", "Environmental Studies"] },
    { class: 1, subjects: ["Tamil", "English", "Mathematics", "Environmental Studies", "Computer Science"] },
    // { class: 2, subjects: ["Tamil", "English", "Mathematics", "Environmental Studies"] },
    { class: 2, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    
    // { class: 3, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    { class: 3, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    // { class: 4, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    { class: 4, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    // { class: 5, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    { class: 5, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    // { class: 6, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    { class: 6, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    // { class: 7, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    { class: 7, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    { class: 8, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science"] },
    { class: 9, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science", "Computer Science"] },
    { class: 10, subjects: ["Tamil", "English", "Mathematics", "Science", "Social Science", "Computer Science"] },
    
    // Higher Secondary Stream (Students select Science, Commerce, or Arts group)
    { class: 11, subjects: ["Tamil", "English", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Commerce", "Economics"] },
    { class: 12, subjects: ["Tamil", "English", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Commerce", "Economics", "Accountancy"] }
];

// Insert subjects into database
const insertSubjects = async () => {
    try {
        await Subject.insertMany(subjectsData);
        console.log("✅ Subjects inserted successfully!");
    } catch (error) {
        console.error("❌ Error inserting subjects:", error);
    } finally {
        mongoose.connection.close(); // Close DB connection after inserting
    }
};

insertSubjects();

