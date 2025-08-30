const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
    },
    date:{
        type: Date,
        required:true
    },
    duration:{
        type:Number,
        default:60
    },
    case:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Case'
    },
    clinet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    lawyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    status:{
        type:String,
        enum:['scheduled','completed','cancelled','rescheduled'],
        default:'scheduled'
    },
    reminderSent:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Appointment',appointmentSchema);