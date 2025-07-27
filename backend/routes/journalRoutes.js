const express = require('express');
const {
  createJournal,
  getAllJournals,
  getJournalById,
  deleteJournal,
} = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createJournal);
router.get('/', protect, getAllJournals);
router.get('/:id', protect, getJournalById);
router.delete('/:id', protect, deleteJournal);

module.exports = router;
