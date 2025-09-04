const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
       
    },
    caseType: {
        type: String,
        enum: ['criminal', 'civil', 'family', 'employment'],
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'in progress', 'pending'],
        default: 'open'
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lawyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    }],
    appointment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    notes: [{
        content: {
            type: String,
            required: true,
            maxlength: [1000, 'Note cannot exceed 1000 characters']
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        isPrivate: {
            type: Boolean,
            default: false
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

caseSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Indexes for better query performance
caseSchema.index({ clientId: 1 });
caseSchema.index({ lawyerId: 1 });

module.exports = mongoose.model('Case', caseSchema);