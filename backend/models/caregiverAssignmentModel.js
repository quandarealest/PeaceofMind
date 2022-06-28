const mongoose = require('mongoose')

const caregiverAssignmentSchema = mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Resident'
  },
  assigneeEmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Employee'
  },
  caregiverEmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Employee'
  },
  assignedDate: {
    type: Date,
    require: [true, 'Please input the date']
  },
  startTime: {
    type: Date,
    require: [true, 'Please input the start time']
  },
  endTime: {
    type: Date,
    require: [true, 'Please input the end time']
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('CaregiverAssignment', caregiverAssignmentSchema)