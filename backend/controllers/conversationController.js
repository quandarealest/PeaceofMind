const asyncHandler = require('express-async-handler')
// const ConversationFamilySupervisorModel = require('../models/conversationFamilySupervisorModel')
const Conversation = require('../models/conversationChatModel')

// @desc Register new conversation
// @route  POST /api/message
// @access Private
const registerConversation = asyncHandler(async (req, res) => {
  const { familyMemberId, supervisorId, roomId } = req.body

  if (!familyMemberId
    || !supervisorId
    || !roomId) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const conversation = await Conversation.create({
    familyMemberId,
    supervisorId,
    roomId,
  })

  if (conversation) {
    res.status(201).json({
      _id: conversation._id,
      familyMemberId: conversation.familyMemberId,
      supervisorId: conversation.supervisorId,
      roomId: conversation.roomId,
      chatLog: conversation.chatLog
    })
  } else {
    res.status(400)
    throw new Error('Invalid conversation data')
  }
})

module.exports = {
  registerConversation
}