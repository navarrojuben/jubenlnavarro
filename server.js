require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if not set


//cors
app.use(cors({
  origin:
  [
    "http://localhost:3000",
    "http://localhost:4000",
    "https://jubenlnavarro.netlify.app"
  ]
}))


//middleware
app.use(express.json()); // Parse JSON bodies

// Request logging middleware
app.use((req, res, next) => {
  console.log(`Request made to: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});


const linkRoutes = require('./routes/links')
const userRoutes = require('./routes/user')
const codeRoutes = require('./routes/code');

// routes
app.use('/api/user', userRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/codes', codeRoutes);


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
