const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  firstName: {
    type: String,
    require: [true, 'Please enter the first name']
  },
  lastName: {
    type: String,
    require: [true, 'Please enter the last name']
  },
  contactNumber: {
    type: Number,
    require: [true, 'Please enter the contact number']
  },
  employeeNumber: {
    type: String,
    require: [true, 'Please enter the employee number'],
    unique: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Employee', employeeSchema)