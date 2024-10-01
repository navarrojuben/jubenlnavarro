const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function(username, password) {

  // validation
  if (!username || !password) {
    throw Error('All fields must be filled')
  }else{}
  // if (!validator.isEmail(email)) {
  //   throw Error('Email not valid')
  // }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error('Password not strong enough')
  // }

  const exists = await this.findOne({ username })

  if (exists) {
    throw Error('username already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ username, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(username, password) {

  if (!username || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ username })
  if (!user) {
    throw Error('Incorrect Username')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)