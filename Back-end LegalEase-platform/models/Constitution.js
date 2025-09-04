const mongoose = require('mongoose');

const ConstitutionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  file: {
    filename: String,
    path: String,
    originalName: String
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Constitution', ConstitutionSchema);