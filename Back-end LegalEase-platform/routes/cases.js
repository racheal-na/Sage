const express = require('express');
const { protect, admin } = require('../middleware/auth');
const Case = require('../models/Case');
const User = require('../models/User');

const router = express.Router();

// Get all cases (admin) or user's cases
router.get('/', protect, async (req, res) => {
  try {
    let cases;
    if (req.user.role === 'admin') {
      cases = await Case.find().populate('client', 'name email').populate('lawyer', 'name email');
    } else {
      cases = await Case.find({ client: req.user._id }).populate('client', 'name email').populate('lawyer', 'name email');
    }
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get case by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id)
      .populate('client', 'name email phone')
      .populate('lawyer', 'name email phone');

    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }

    // Check if user has access to this case
    if (req.user.role !== 'admin' && caseItem.client._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(caseItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new case (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const { title, description, type, clientId } = req.body;

    const caseItem = new Case({
      title,
      description,
      type,
      client: clientId,
      lawyer: req.user._id
    });

    const createdCase = await caseItem.save();
    const populatedCase = await Case.findById(createdCase._id)
      .populate('client', 'name email')
      .populate('lawyer', 'name email');

    res.status(201).json(populatedCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update case
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);

    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }

    const { title, description, type, status } = req.body;

    caseItem.title = title || caseItem.title;
    caseItem.description = description || caseItem.description;
    caseItem.type = type || caseItem.type;
    caseItem.status = status || caseItem.status;
    caseItem.updatedAt = Date.now();

    const updatedCase = await caseItem.save();
    const populatedCase = await Case.findById(updatedCase._id)
      .populate('client', 'name email')
      .populate('lawyer', 'name email');

    res.json(populatedCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete case
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);

    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }

    await Case.deleteOne({ _id: req.params.id });
    res.json({ message: 'Case removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;