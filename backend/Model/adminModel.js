const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'email must been required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
})

adminSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next();
})

module.exports = mongoose.model('admin',adminSchema)