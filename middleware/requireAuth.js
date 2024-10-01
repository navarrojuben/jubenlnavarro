const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to require authorization
const requireAuth = async (req, res, next) => {
  // Verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    // Verify token and extract payload
    const { _id, username } = jwt.verify(token, process.env.SECRET);

    // Check if the user exists in the database
    const user = await User.findById(_id).select('_id username');

    // If the user is found, attach it to the request
    if (user) {
      req.user = user;
    } else {
      // Allow access for master users who are not in the User collection
      const isMasterUser = process.env.MASTER_USERNAME1 === username ||
                           process.env.MASTER_USERNAME2 === username ||
                           process.env.MASTER_USERNAME3 === username;

      if (isMasterUser) {
        req.user = { username }; // Allow access for master users
      } else {
        return res.status(401).json({ error: 'Request is not authorized' });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
