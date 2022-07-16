const mongoose = require('mongoose')

const chatLog = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  text: {
    type: String,
    require: true
  },
}, {
  timestamps: true
})

const conversationChatSchema = mongoose.Schema({
  chatLog: {
    type: [chatLog],
    default: []
  },
  familyMemberId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  supervisorId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  roomId: {
    type: String,
    require: true,
    unique: true,
  }
}, {
  timestamps: true
})

// const conversationChatSchema = mongoose.Schema({
//   conversationFamilySupervisorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     require: true,
//     ref: 'ConversationFamilySupervisor'
//   },
//   message: {
//     type: String,
//     require: [true, 'Please enter the message'],
//   },
//   toUserId: {
//     type: mongoose.Schema.Types.ObjectId,
//     require: true,
//     ref: 'User'
//   },
//   fromUserId: {
//     type: mongoose.Schema.Types.ObjectId,
//     require: true,
//     ref: 'User'
//   },
// }, {
//   timestamps: true
// })

module.exports = mongoose.model('ConversationChat', conversationChatSchema)