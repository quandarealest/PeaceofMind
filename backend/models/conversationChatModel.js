const mongoose = require('mongoose')

const conversationChatSchema = mongoose.Schema({
  conversationFamilySupervisorId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'ConversationFamilySupervisor'
  },
  message: {
    type: String,
    require: [true, 'Please enter the message'],
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('ConversationChat', conversationChatSchema)