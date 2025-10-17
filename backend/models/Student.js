const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  user: {  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'user',  // Referring to the 'user' collection  
    required: true  
  },
  date: {
    type: Date,
    default: Date.now // Auto-generate timestamp
  }
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
