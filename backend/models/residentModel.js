const mongoose = require('mongoose')

const residentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  supervisorEmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Employee'
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
  residentNumber: {
    type: String,
    require: [true, 'Please enter the resident number'],
    unique: true
  },
  roomNumber: {
    type: String,
    require: [true, 'Please enter the room number']
  },
  gender: {
    type: String,
    require: [true, 'Please enter the resident gender']
  },
  dob: {
    type: Date,
    require: [true, 'Please enter the dob']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Resident', residentSchema)