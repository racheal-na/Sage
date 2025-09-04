// routes/constitution.js
const express = require('express');
const {
  getConstitutions,
  getConstitution,
  createConstitution,
  updateConstitution,
  deleteConstitution
} = require('../controllers/constitutionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all constitutions or create a new one
router.route('/')
  .get(getConstitutions) // All authenticated users can view
  .post(authorize('lawyer', 'client'), createConstitution); // Only lawyer/admin can create

// Get, update, or delete a specific constitution by ID
router.route('/:id')
  .get(getConstitution) // All authenticated users can view
  .put(authorize('lawyer', 'client'), updateConstitution) // Only uploader (lawyer/admin) can update
  .delete(authorize('lawyer', 'client'), deleteConstitution); // Only uploader (lawyer/admin) can delete

module.exports = router;
