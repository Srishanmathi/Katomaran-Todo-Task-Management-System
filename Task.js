// Example: models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: { // Changed
    type: String,
    required: true, // Make description required
    trim: true,
  },
  dueDate: { // Changed
    type: Date,
    required: true, // Make due date required
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', TaskSchema);