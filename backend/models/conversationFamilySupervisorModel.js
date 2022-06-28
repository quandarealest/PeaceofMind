const mongoose = require('mongoose')

const conversationFamilySupervisorSchema = mongoose.Schema({
  subject: {
    type: String,
    require: [true, 'Please enter the subject'],
  },
  residentFamilyId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'ResidentFamily'
  },
  supervisorEmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Employee'
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('ConversationFamilySupervisor', conversationFamilySupervisorSchema)