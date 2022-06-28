const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: [true, 'Please add an username']
  },
  password: {
    type: String,
    require: [true, 'Please add a password']
  },
  email: {
    type: String,
    require: [true, 'Please add an email'],
    unique: true
  },
  role: {
    type: String,
    require: [true, 'Please add a role']
  },
  isActivated: {
    type: Boolean,
    require: [true, 'Please indicate whether activated or not']
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('User', userSchema)