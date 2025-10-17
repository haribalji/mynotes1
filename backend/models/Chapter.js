const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
    class: { type: Number, required: true },
    subject: { type: String, required: true },
    chapters: [{ type: String, required: true }] // List of chapter names
});

module.exports = mongoose.model("Chapter", ChapterSchema);
