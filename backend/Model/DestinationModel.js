const mongoose = require('mongoose')
const destSchema = new mongoose.Schema({
    resortName: {
        type: String,
        require: true,
        ref: 'Resort'
    },
    resortowner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Staff"
    },
    dest_name: {
        type: String
    },
    about: {
        type: String,
    },
    place: {
        type: String
    },
    dest_img: {
        type: [String]
    },
    price: {
        type: Number
    },

    verify: {
        type: Boolean,
        default: false
    }

})
module.exports = mongoose.model('Destination', destSchema)