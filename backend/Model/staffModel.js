const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, 'phone is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    verified: {
        type: Boolean,
        default: false

    },
    admin_approval: {
        type: String,
        default: 'Unblock'
    }





})
staffSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})
module.exports = mongoose.model('Staff', staffSchema)