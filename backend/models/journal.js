import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  journey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journey',
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  mood: {
    type: String,
  },
  tags: [String],
  photo: {
    type: String, // This will store the file path or image URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Journal', journalSchema);
