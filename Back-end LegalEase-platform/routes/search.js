const express = require('express');
const { protect } = require('../middleware/auth');
const Case = require('../models/Case');
const Document = require('../models/Document');
const Appointment = require('../models/Appointment');

const router = express.Router();

// Unified search endpoint
router.get('/', protect, async (req, res) => {
  try {
    const { q, type } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    let results = {};
    
    // Search cases
    if (!type || type === 'cases') {
      const caseQuery = {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      };
      
      // Restrict to user's cases if not admin
      if (req.user.role !== 'admin') {
        caseQuery.client = req.user._id;
      }
      
      results.cases = await Case.find(caseQuery)
        .populate('client', 'name email')
        .populate('lawyer', 'name email')
        .limit(10);
    }
    
    // Search documents
    if (!type || type === 'documents') {
      const documentQuery = {
        originalName: { $regex: q, $options: 'i' }
      };
      
      // For non-admins, only search their documents
      if (req.user.role !== 'admin') {
        const userCases = await Case.find({ client: req.user._id }).select('_id');
        const caseIds = userCases.map(c => c._id);
        documentQuery.case = { $in: caseIds };
      }
      
      results.documents = await Document.find(documentQuery)
        .populate('case', 'title')
        .populate('uploadedBy', 'name')
        .limit(10);
    }
    
    // Search appointments
    if (!type || type === 'appointments') {
      const appointmentQuery = {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      };
      
      // Restrict to user's appointments if not admin
      if (req.user.role !== 'admin') {
        appointmentQuery.$or = [
          { client: req.user._id },
          { lawyer: req.user._id }
        ];
      }
      
      results.appointments = await Appointment.find(appointmentQuery)
        .populate('client', 'name email')
        .populate('lawyer', 'name email')
        .populate('case', 'title')
        .limit(10);
    }
    
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Search failed' });
  }
});

module.exports = router;