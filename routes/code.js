const express = require('express');
const Code = require('../models/Code');

const router = express.Router();

// Get code snippets, optionally filtered by username
router.get('/', async (req, res) => {
  try {
    const { username } = req.query; // Extract the username from query parameters

    let codes;
    
    if (username) {
      // If a username is provided, filter by username
      codes = await Code.find({ username });
    } else {
      // If no username is provided, return all code snippets
      codes = await Code.find();
    }

    res.json(codes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new code snippet
router.post('/', async (req, res) => {
  const { title, description, code, language, username } = req.body;

  const newCode = new Code({
    title,
    description,
    code,
    language,
    username
  });

  try {
    const savedCode = await newCode.save();
    res.status(201).json(savedCode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a code snippet
router.put('/:id', async (req, res) => {
  try {
    const updatedCode = await Code.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a code snippet
router.delete('/:id', async (req, res) => {
  try {
    await Code.findByIdAndDelete(req.params.id);
    res.json({ message: 'Code snippet deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
