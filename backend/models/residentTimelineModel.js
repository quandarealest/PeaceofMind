const mongoose = require('mongoose')

const residentTimelineSchema = mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  postedEmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
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
  },
  Type: {
  type: String,
  require: [true, 'Please select a content type']
},
},
{
  timestamps: true
})

module.exports = mongoose.model('ResidentTimeline', residentTimelineSchema)