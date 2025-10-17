const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubjectSchema = new Schema({
    class: {
        type: Number,
        required: true,
        min: 1,
        max: 12, // Restrict class between 1 and 12
    },
    subjects: {
        type: [String], // Array of subject names
        required: true,
    },
});

// Export the model
module.exports = mongoose.model("Subject", SubjectSchema);
