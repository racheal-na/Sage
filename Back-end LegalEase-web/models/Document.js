const mongoose = require('mongoose');

const documentSchema= new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim:true
    },
    descripiton:{
        type:String,

    },
    file:{
        filename:String,
        originalName: String,
        path:String,
        size: Number,
        mimetpe:String
    },
    case:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Case',
        required:true

    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    shareWith:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    createAt:{
       type:Date,
       default:Date.now
    }
});

module.exports=mongoose.model('Document',documentSchema);