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
        enum:['appointment','document','case','system'],
        required:true
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    relatedEntity:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel'
    },
    onModel:{
        type:String,
        enum:['Case','Document','Appointment']
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