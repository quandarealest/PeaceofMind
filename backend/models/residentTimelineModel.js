const mongoose = require('mongoose')

const timelineLog = mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  postedEmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  photo: {
    base64: String,
    imageFormat: String,
  },
  note: {
    type: String,
  },
  postedTime: {
    type: Date,
    require: [true, 'Please input the posted time']
  },
  type: {
    type: String,
    require: [true, 'Please select a content type']
  },
})

const residentTimelineSchema = mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  roomId: {
    type: String,
    require: true,
    unique: true,
  },
  timelineLog: {
    type: [timelineLog],
    default: []
  }
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Timeline', residentTimelineSchema)