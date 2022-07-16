const mongoose = require('mongoose')

const residentFamilySchema = mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
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
  emergencyContact: {
    type: Boolean,
    require: [true, 'Please indicate this is an emergency con or not']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('ResidentFamily', residentFamilySchema)