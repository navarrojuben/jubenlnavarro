const express = require('express');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require authentication for all event routes
router.use(requireAuth);

// GET /api/events - Get all events for the authenticated user
router.get('/', getEvents);

// POST /api/events - Create a new event
router.post('/', createEvent);

// PUT /api/events/:id - Update an event
router.put('/:id', updateEvent);

// DELETE /api/events/:id - Delete an event
router.delete('/:id', deleteEvent);

module.exports = router;
