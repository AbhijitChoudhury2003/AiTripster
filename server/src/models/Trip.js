const mongoose = require('mongoose');

// Super simple Trip model - Perfect for interviews
const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  // AI response stored as simple text
  aiResponse: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);
