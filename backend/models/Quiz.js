const mongoose = require('mongoose');
const { Schema } = mongoose;
const quizSchema = new mongoose.Schema({
  question: String,
  answers: [
    {
      text: String,
      correct: Boolean,
    },
  ],
});

// Create the model based on the schema
module.exports = mongoose.model("quizzes", quizSchema);

// module.exports = mongoose.model('Quiz', QuizSchema);
