const mongoose = require('mongoose')

const recurringScheduleSchema = mongoose.Schema({
  residentScheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'ResidentSchedule'
  },
  recurringScheduleKey: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, 'Please input the recurring schedule key'],
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('RecurringSchedule', recurringScheduleSchema)