const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Fetch master credentials from environment variables
const MASTER_CREDENTIALS = [
  {
    username: process.env.MASTER_USERNAME1,
    password: process.env.MASTER_PASSWORD1,
  },
  {
    username: process.env.MASTER_USERNAME2,
    password: process.env.MASTER_PASSWORD2,
  },
  {
    username: process.env.MASTER_USERNAME3,
    password: process.env.MASTER_PASSWORD3,
  },
];

// Create a token (no expiration for all users)
const createToken = (user) => {
  return jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET);
};

// Login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if the credentials match a master user
  const master = MASTER_CREDENTIALS.find(
    (master) => master.username === username && master.password === password
  );

  if (master) {
    // Return token without expiration for master users
    const token = createToken({ _id: master.username, username: master.username });
    return res.status(200).json({ username, token, master: true });
  }

  try {
    const user = await User.login(username, password);

    // Create a token for regular users
    const token = createToken(user);

    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup a user
const signupUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);

    // Create a token
    const token = createToken(user);

    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id; // Assuming you have middleware to set req.user

  try {
    const user = await User.findById(userId);

    // Validate old password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new Error('Old password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, changePassword };
