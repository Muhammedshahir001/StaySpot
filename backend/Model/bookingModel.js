const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    resortId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resort",
    },

    traveler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },

    fromDate: {
        type: String,
        required: true,
    },
    toDate: {
        type: String,
        required: true,
    },
    Booked_at: {
        type: Date,
    },
    payment: {
        payment_amount: { type: Number },
        payment_method: { type: String },
        payment_id: { type: String },
        
        payment_status: { type: String, default: "pending" },
    },

    status: {
        type: String,
        required: true,
        default: "booked",
    },
    selected_rooms: {
        type: Number

    },
});
module.exports = mongoose.model("Booking", bookingSchema);
