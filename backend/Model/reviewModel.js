const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Assuming 'Users' is the model for users
        required: true
    },
    resort: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resort', // Assuming 'Resort' is the model for resorts
        required: true
    },
    content: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, {
    timestamps: true // To track when the review was created
});

module.exports = mongoose.model('Review', reviewSchema);
