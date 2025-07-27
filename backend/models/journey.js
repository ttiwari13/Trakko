const mongoose = require('mongoose');

const routePointSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const journeySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startLocation: {
    lat: Number,
    lng: Number,
  },
  endLocation: {
    lat: Number,
    lng: Number,
  },
  route: [routePointSchema],  // array of GPS points
  startedAt: Date,
  endedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Journey', journeySchema);
