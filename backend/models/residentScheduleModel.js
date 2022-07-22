const mongoose = require('mongoose')

const residentScheduleSchema = mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  task: {
    type: String,
    require: [true, 'Please enter a task']
  },
  scheduleDate: {
    type: Date,
    require: [true, 'Please enter the date of the schedule']
  },
  startTime: {
    type: Date,
    require: [true, 'Please input the start time']
  },
  endTime: {
    type: Date,
    require: [true, 'Please input the end time']
  },
  createdDate: {
    type: Date,
    require: [true, 'Please input the created time']
  },
  status: {
    type: String,
    require: [true, 'Please input the status']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('ResidentSchedule', residentScheduleSchema)