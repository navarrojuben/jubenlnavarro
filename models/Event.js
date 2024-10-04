const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Birthday', 'Meeting', 'Event', 'Other'],
    required: true
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true
  },
  username: {
    type: String,
    required: true // Ensure every event is tied to a user
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
