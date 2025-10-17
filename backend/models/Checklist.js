const mongoose = require("mongoose");

const ChecklistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link checklist to user
  classNumber: { type: String, required: true },
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  items: [
    {
      text: { type: String, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Checklist", ChecklistSchema);
