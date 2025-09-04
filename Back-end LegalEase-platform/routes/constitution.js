const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect, admin } = require('../middleware/auth');
const Constitution = require('../models/Constitution');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/constitution/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get active constitution
router.get('/', async (req, res) => {
  try {
    const constitution = await Constitution.findOne({ isActive: true })
      .populate('uploadedBy', 'name');
    res.json(constitution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all constitution versions (admin only)
router.get('/all', protect, admin, async (req, res) => {
  try {
    const constitutions = await Constitution.find()
      .populate('uploadedBy', 'name')
      .sort({ uploadedAt: -1 });
    res.json(constitutions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload constitution (admin only)
router.post('/', protect, admin, upload.single('constitution'), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Deactivate all previous constitutions
    await Constitution.updateMany({}, { isActive: false });

    const constitution = new Constitution({
      title,
      description,
      file: {
        filename: req.file.filename,
        path: req.file.path,
        originalName: req.file.originalname
      },
      uploadedBy: req.user._id
    });

    const createdConstitution = await constitution.save();
    const populatedConstitution = await Constitution.findById(createdConstitution._id)
      .populate('uploadedBy', 'name');

    res.status(201).json(populatedConstitution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download constitution
router.get('/download/:id', async (req, res) => {
  try {
    const constitution = await Constitution.findById(req.params.id);

    if (!constitution) {
      return res.status(404).json({ message: 'Constitution not found' });
    }

    res.download(constitution.file.path, constitution.file.originalName);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;