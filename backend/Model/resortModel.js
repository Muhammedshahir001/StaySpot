const mongoose = require ('mongoose');
const resortSchema = new mongoose.Schema({
    resortowner:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"Staff"
    },
    resortname:{
        type:String,
        required:[true,'resort name is requires']
    },
    place:{
        type:String,
        required:[true,'location of resort  is required']
    },
    number_room:{
        type:Number
    },
    address:{
        type:String,
        required:[true]
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    image:{
        type: [String],
        required:[true,'image is requires']
    },
    document:{
        type:String,
        required:[true,'certificate is must been needed']
    },
    price:{
        type:Number,
        required:[true,'price is required']
    },
    verify:{
        type:String,
        default:'new'
    },
    phone:{
        type:Number
    },
    status:{
        type:String,
        default:'Enable'
    },
    service:{
        type:String,
        required:[true,'services are must been required']
    },

    reject_reason:{
        type:String,
    }
})

module.exports = mongoose.model('Resort', resortSchema)