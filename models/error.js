const mongoose = require('mongoose');

const { Schema } = mongoose;

const ErrorSchema = new Schema({
  isDataValid: {
    type: Boolean,
    default: false,
  },
  numberOfErrors: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Error', ErrorSchema);
