const express = require('express');
const {
  getCases,
  getCase,
  createCase,
  updateCase,
  addNote,
  deleteCase
} = require('../controllers/caseController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/')
  .get(getCases)
  .post(authorize('lawyer'), createCase);

router.route('/:id')
  .get(getCase)
  .put(updateCase)
  .delete(authorize('lawyer'), deleteCase);

router.route('/:id/notes')
  .post(addNote);

module.exports = router;