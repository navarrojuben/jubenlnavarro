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
  }, recurrence: {
    type: String,
    enum: ['None', 'Daily', 'Weekly', 'Monthly', 'Yearly'], // Simple recurrence options
    default: 'None',
  },
  recurrenceEndDate: {
    type: Date, // Optional: If you want the recurrence to stop at a certain date
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
