const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

router.post('/login', (req, res) => {
  console.log("Received signup data:", req.body); // Log the body
  // Handle your signup logic here...

  res.status(201).json({ message: 'login successful!' });
});

// login route
router.post('/login', loginUser)

router.post('/signup', (req, res) => {
  console.log("Received signup data:", req.body); // Log the body
  // Handle your signup logic here...

  res.status(201).json({ message: 'Signup successful!' });
});

// signup route
router.post('/signup', signupUser)
// Example route for signup


module.exports = router