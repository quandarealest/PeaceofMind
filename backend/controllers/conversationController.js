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

// @desc get conversation list
// @route  GET /api/message
// @access Private
const getConversationList = asyncHandler(async (req, res) => {
  const conversationList = await Conversation.find()

  res.status(201).json(conversationList)
})

// @desc update chat log
// @route  PUT /api/message/:roomId
// @access Private
const updateChatLog = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findOne({ roomId: req.params.roomId })
  if (!conversation) {
    res.status(400)
    throw new Error('Conversation not found')
  }

  const updatedConversation = await Conversation.findByIdAndUpdate(conversation._id, req.body, { new: true })

  res.status(200).json(updatedConversation)
})

// @desc get chat log
// @route  GET /api/message/:roomId
// @access Private
const getChatLog = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findOne({ roomId: req.params.roomId })
  if (!conversation) {
    res.status(400)
    throw new Error('Conversation not found')
  }

  res.status(200).json(conversation)
})

module.exports = {
  registerConversation,
  getConversationList,
  updateChatLog,
  getChatLog
}