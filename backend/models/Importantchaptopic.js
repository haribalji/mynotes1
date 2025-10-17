const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImportantTopicSchema = new mongoose.Schema({
    class: { type: String, required: true }, // Added class number

    subject: { type: String, required: true },
    chapter: { type: String, required: true },
    topics: { type: [String], required: true },
});

const ImportantTopic = mongoose.model("ImportantTopic", ImportantTopicSchema);
module.exports = ImportantTopic;


