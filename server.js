require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
// const corsOptions = {
//   origin: [
//     "http://localhost:3000",
//     "http://localhost:4000",
//     "https://jubenlnavarro.netlify.app",
//     "https://jubenlnavarro.up.railway.app"
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   credentials: true,
// };

const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};



// Apply CORS middleware
app.use(cors());

// Middleware for handling JSON
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`Request made to: ${req.method} ${req.url}`);
  next();
});

// Define routes
const linkRoutes  = require('./routes/links');
const userRoutes  = require('./routes/user');
const codeRoutes  = require('./routes/code');
const eventRoutes = require('./routes/events');

// Routes
app.use('/api/user', userRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/codes', codeRoutes);
app.use('/api/events', eventRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connected to DB & listening on port', PORT);
    });
  })
  .catch((error) => {
    console.log('Database connection error:', error);
  });
