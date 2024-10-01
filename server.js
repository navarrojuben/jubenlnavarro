const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

// Set up CORS to only allow specific origins
const allowedOrigins = [
  'http://localhost:3000', // Frontend development URL
  'https://your-production-frontend.com', // Frontend production URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions)); // Apply CORS with options

app.use(express.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Sample route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to the Code Snippets API');
});

// Routes
const codeRoutes = require('./routes/codeRoutes'); // Existing code-related routes
const authRoutes = require('./routes/auth'); // User authentication routes

// Use the routes
app.use('/api/codes', codeRoutes);
app.use('/api/auth', authRoutes); // Add this line for user auth (login, register)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
