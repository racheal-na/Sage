const mongoose = require('mongoose');
const Case = require('../models/Case');
const User = require('../models/User');
const Notification = require('../models/Notification');

// Get all cases
exports.getCases = async (req, res) => {
  try {
    let cases;
    if (req.user.userType === 'lawyer') {
      cases = await Case.find({ lawyerId: req.user.id })
        .populate('clientId', 'name email')
        .populate('documents')
        .populate('appointments');
    } else {
      cases = await Case.find({ clientId: req.user.id })
        .populate('lawyerId', 'name email')
        .populate('documents')
        .populate('appointments');
    }
    res.json(cases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single case
exports.getCase = async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id)
      .populate('clientId', 'name email')
      .populate('lawyerId', 'name email userType')
      .populate('documents')
      .populate('appointments')
      .populate('notes.createdBy', 'name');

    if (!caseItem) return res.status(404).json({ message: 'Case not found' });

    // Permission check
    if (req.user.userType === 'client' && caseItem.clientId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    if (req.user.userType === 'lawyer' && caseItem.lawyerId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(caseItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new case
exports.createCase = async (req, res) => {
  try {
    const { title, description, caseType, clientId } = req.body;

    // Validate clientId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({ message: 'Invalid clientId format.' });
    }

    const newCase = await Case.create({
      title,
      description,
      caseType,
      clientId: clientId,
      lawyerId: req.user.id,
      uploadedBy: req.user.id
    });

    await newCase.populate('clientId', 'name email');
    await newCase.populate('lawyerId', 'name email userType');

    await User.findByIdAndUpdate(clientId, {
      $push: { cases: newCase._id }
    });

    await Notification.create({
      title: 'New Case Created',
      message: `A new case "${title}" has been created for you.`,
      type: 'case',
      recipient: clientId,
      relatedEntity: newCase._id,
      onModel: 'Case'
    });

    res.status(201).json(newCase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update case (add note)
exports.updateCase = async (req, res) => {
  try {
    const { content } = req.body;
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) return res.status(404).json({ message: 'Case not found' });

    // Permission check
    if (req.user.userType === 'client' && caseItem.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    if (req.user.userType === 'lawyer' && caseItem.lawyerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Add note
    caseItem.notes.push({
      content,
      createdBy: req.user.id
    });

    await caseItem.save();
    await caseItem.populate('notes.createdBy', 'name');

    const recipient = req.user.userType === 'client' ? caseItem.lawyerId : caseItem.clientId;

    await Notification.create({
      title: 'New Note Added',
      message: `A new note has been added to case "${caseItem.title}".`,
      type: 'case',
      recipient,
      relatedEntity: caseItem._id,
      onModel: 'Case'
    });

    res.status(201).json(caseItem.notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete case
exports.deleteCase = async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) return res.status(404).json({ message: 'Case not found' });

    if (caseItem.lawyerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await User.findByIdAndUpdate(caseItem.clientId, {
      $pull: { cases: caseItem._id }
    });

    await User.findByIdAndUpdate(caseItem.lawyerId, {
      $pull: { cases: caseItem._id }
    });

    await Case.findByIdAndDelete(req.params.id);

    res.json({ message: 'Case removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add note (alternative endpoint)
exports.addNote = async (req, res) => {
  try {
    const { content } = req.body;
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) return res.status(404).json({ message: 'Case not found' });

    // Permission check
    if (req.user.userType === 'client' && caseItem.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    if (req.user.userType === 'lawyer' && caseItem.lawyerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    caseItem.notes.push({
      content,
      createdBy: req.user.id
    });

    await caseItem.save();
    await caseItem.populate('notes.createdBy', 'name');

    res.status(201).json(caseItem.notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add document
exports.addDocument = async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) return res.status(404).json({ message: 'Case not found' });

    // Permission check
    if (req.user.userType === 'client' && caseItem.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    if (req.user.userType === 'lawyer' && caseItem.lawyerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const newDoc = {
      name: req.file.originalname,
      path: req.file.path,
      uploadedBy: req.user.id
    };

    caseItem.documents.push(newDoc);
    await caseItem.save();

    res.status(201).json(caseItem.documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
