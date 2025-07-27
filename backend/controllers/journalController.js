const Journal = require('../models/journalModel.js');

const createJournal = async (req, res) => {
  try {
    const { title, content, mood, tags, journey } = req.body;

    const journal = await Journal.create({
      user: req.user._id,
      journey,
      title,
      content,
      mood,
      tags,
      photo,
    });

    res.status(201).json(journal);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create journal', error: err.message });
  }
};

const getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(journals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch journals', error: err.message });
  }
};

const getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findOne({ _id: req.params.id, user: req.user._id });
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.status(200).json(journal);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch journal', error: err.message });
  }
};

const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.status(200).json({ message: 'Journal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete journal', error: err.message });
  }
};

const updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.status(200).json(journal);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update journal', error: err.message });
  }
};

module.exports = {
  createJournal,
  getAllJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
};
