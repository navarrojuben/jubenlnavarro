const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// change password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  const userId = req.user._id // Assuming you have middleware to set req.user

  try {
    const user = await User.findById(userId)

    // Validate old password
    const isMatch = await user.comparePassword(oldPassword)
    if (!isMatch) {
      throw new Error('Old password is incorrect')
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { signupUser, loginUser, changePassword }
