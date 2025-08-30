const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    message:{
        type:String,
        required: true
    },
    type:{
        type: String,
        enuim:['appointment','ducmont','case','sytem'],
        required:true
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    relatedEnitity:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel'
    },
    onModel:{
        type:String,
        enium:['Case','Document','Appointment']
    },
    read:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Notification',notificationSchema)