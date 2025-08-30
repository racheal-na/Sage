const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    caseType:{
        type:String,
        enuim:['criminal','civil','family','employment'],
        required: true
    },
    status:{
        type: String,
        enuim: ['open','closed','pending'],
        default: 'open'
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    lawyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    documents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Document'
    }],
    appointment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Appointment'
    }],
    notes:[{
        content:String,
        createBy:{
             type: mongoose.Schema.Types.ObjectId,
             ref:'user',
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    }],
    createdAt:{
            type: Date,
            default: Date.now
        },
    upatedAt:{
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save',async function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports=mongoose.model('Case',caseSchema);