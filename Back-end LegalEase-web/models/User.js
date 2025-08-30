const bcrypt= require('bcryptjs');
const mongoose  = require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
          type: String,
          required:true,
          unique:true,
          lowercase:true,
          match:[/^w+([.-]?\w+)*@w+([.-]?\w+)*(\.\w{2,3})+$/,'please enter a valid email']
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        unique:true,
    },
    cases:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Case'
    }],
    appointments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Appointment'
    }],
    createAt:{
        type: Date,
        default:Date.now
    }
});

userSchema.pre('save',async function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports=mongoose.model('User',userSchema);