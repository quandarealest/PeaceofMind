const mongoose = require('mongoose')

const residentTimelineSchema = mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Resident'
  },
  postedEmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Employee'
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  note: {
    type: String,
  },
  postedTime: {
    type: Date,
    require: [true, 'Please input the posted time']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('ResidentTimeline', residentTimelineSchema)