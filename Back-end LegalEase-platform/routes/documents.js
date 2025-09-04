const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/auth');
const Document = require('../models/Document');
const Case = require('../models/Case');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get all documents for a case
router.get('/case/:caseId', protect, async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.caseId);

    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }

    // Check if user has access to this case
    if (req.user.role !== 'admin' && caseItem.client.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const documents = await Document.find({ case: req.params.caseId })
      .populate('uploadedBy', 'name')
      .sort({ uploadedAt: -1 });

    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload document
router.post('/', protect, upload.single('document'), async (req, res) => {
  try {
    const { caseId, description } = req.body;

    const caseItem = await Case.findById(caseId);

    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }

    // Check if user has access to this case
    if (req.user.role !== 'admin' && caseItem.client.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const document = new Document({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      case: caseId,
      uploadedBy: req.user._id
    });

    const createdDocument = await document.save();
    const populatedDocument = await Document.findById(createdDocument._id)
      .populate('uploadedBy', 'name');

    res.status(201).json(populatedDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download document
router.get('/download/:id', protect, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id)
      .populate('case');

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Check if user has access to this document
    if (req.user.role !== 'admin' && document.case.client.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.download(document.path, document.originalName);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete document
router.delete('/:id', protect, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id)
      .populate('case');

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Only admin can delete documents
    if (req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Delete file from filesystem
    const fs = require('fs');
    if (fs.existsSync(document.path)) {
      fs.unlinkSync(document.path);
    }

    await Document.deleteOne({ _id: req.params.id });
    res.json({ message: 'Document removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;