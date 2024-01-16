const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  profilePicture: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User