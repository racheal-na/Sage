const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['criminal', 'civil', 'family', 'corporate'],
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'pending'],
    default: 'open'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Case', CaseSchema);