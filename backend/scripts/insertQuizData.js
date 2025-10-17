const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();
const quizzes = require("../models/Quiz");
// const mongoURI ='mongodb+srv://haribalaji17072004:123456hari@cluster0.b21vp.mongodb.net/mynotes';
const mongoURI = 'mongodb://localhost:27017/mynotes'; // Specify your database name

// Define MongoDB connection
mongoose
  .connect(mongoURI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define your schema for quiz data
// const quizSchema = new mongoose.Schema({
//   question: String,
//   answers: [
//     {
//       text: String,
//       correct: Boolean,
//     },
//   ],
// });

// Create the model based on the schema
// const Quiz = mongoose.model("Quiz", quizSchema);

// Read the JSON file containing quiz data
const loadQuizData = () => {
  const data = JSON.parse(fs.readFileSync("quizData.json", "utf8"));
  return data;
};

// Insert quiz data into MongoDB
const insertQuizData = async () => {
  try {
    const quizData = loadQuizData();
    await quizzes.insertMany(quizData);
    console.log("Quiz data inserted successfully!");
    mongoose.connection.close(); // Close the database connection
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

// Run the insertion function
insertQuizData();
