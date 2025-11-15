const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    // Store the task title
    title: { 
        type: String, 
        required: true 
    },
    // Track if the task is completed
    completed: { 
        type: Boolean, 
        default: false 
    },
    // Store the date the task was created or due
    date: { 
        type: String 
    },
    // Add a placeholder for user ID when authentication is fully implemented
    userId: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('Task', TaskSchema);