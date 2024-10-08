const Event = require('../models/Event');

// Get all events for the logged-in user
const getEvents = async (req, res) => {
  const { username } = req.user; // Extracted from requireAuth

  try {
    // Fetch events associated with the logged-in user
    const events = await Event.find({ username });
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch events' });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  const { title, type, description, date } = req.body;
  const { username } = req.user; // Extracted from requireAuth

  try {
    const event = await Event.create({ title, type, description, date, username, recurrence});
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create event' });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  const { id } = req.params; // Event ID from URL
  const { title, type, description, date } = req.body;
  const { username } = req.user; // Extracted from requireAuth

  // Check if the user is a master user
  const isMasterUser = process.env.MASTER_USERNAME1 === username ||
                       process.env.MASTER_USERNAME2 === username ||
                       process.env.MASTER_USERNAME3 === username;

  try {
    // Allow master users to update any event, else restrict to their own events
    const query = isMasterUser ? { _id: id } : { _id: id, username };
    const updatedEvent = await Event.findOneAndUpdate(query, { title, type, description, date, recurrence}, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found or not authorized' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update event' });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params; // Event ID from URL
  const { username } = req.user; // Extracted from requireAuth

  // Check if the user is a master user
  const isMasterUser = process.env.MASTER_USERNAME1 === username ||
                       process.env.MASTER_USERNAME2 === username ||
                       process.env.MASTER_USERNAME3 === username;

  try {
    // Allow master users to delete any event, else restrict to their own events
    const query = isMasterUser ? { _id: id } : { _id: id, username };
    const deletedEvent = await Event.findOneAndDelete(query);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found or not authorized' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete event' });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
