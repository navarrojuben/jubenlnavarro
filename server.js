const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Sample route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to the Code Snippets API');
});

// Define routes for code snippets
const codeRoutes = require('./routes/codeRoutes');
app.use('/api/codes', codeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
