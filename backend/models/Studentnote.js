const mongoose = require("mongoose");
const { Schema } = mongoose;

// const StudentNoteSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user (student)
//     classNumber: { type: String, required: true },
//     subject: { type: String, required: true },
//     chapter: { type: String, required: true },
//     notes: { type: String, default: "" },
//     files: [
//         {
//             fileName: { type: String, required: true },
//             fileUrl: { type: String, required: true },
//             fileType: { type: String, required: true }, // Image, Video, Audio
//         },
//     ],
// }, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// const StudentNote = mongoose.model("StudentNote", StudentNoteSchema);
// module.exports = StudentNote;

// const mongoose = require("mongoose");

// const StudentNoteSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   classNumber: { type: String, required: true },
//   subject: { type: String, required: true },
//   chapter: { type: String, required: true },
//   title: { type: String, required: true, minlength: 5 },
//   description: { type: String, required: true, minlength: 5 },
//   tag: { type: String, default: "General" },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("StudentNote", StudentNoteSchema);

// const mongoose = require("mongoose");
const StudentNoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  classNumber: { type: String, required: true },
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StudentNote", StudentNoteSchema);
