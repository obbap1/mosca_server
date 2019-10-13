const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReadingSchema = new Schema({
  humidity: {
    type: Number,
    default: 0,
  },
  temperature: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reading', ReadingSchema);
