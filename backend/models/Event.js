const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    // Store the event title
    title: { 
        type: String, 
        required: true 
    },
    // Date of the event
    date: { 
        type: String, 
        required: true 
    },
    // Time of the event
    time: { 
        type: String, 
        required: true 
    },
    // Add a placeholder for user ID
    userId: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('Event', EventSchema);