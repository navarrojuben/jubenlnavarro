require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration (allow all for testing)
app.use(cors({
  origin: [
            "http://localhost:3000",
            "http://localhost:4000",
            "https://jubenlnavarro.netlify.app",
            "https://jubenlnavarro.up.railway.app"
          ], // Allow all origins for now
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true, // Allow cookies/credentials to be sent
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

// Middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`Request made to: ${req.method} ${req.url}`);
  next();
});

const linkRoutes = require('./routes/links');
const userRoutes = require('./routes/user');
const codeRoutes = require('./routes/code');

// Routes
app.use('/api/user', userRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/codes', codeRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connected to DB & listening on port', PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
