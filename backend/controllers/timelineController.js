const asyncHandler = require('express-async-handler')
// const ConversationFamilySupervisorModel = require('../models/conversationFamilySupervisorModel')
const Timeline = require('../models/residentTimelineModel')

// @desc Register new conversation
// @route  POST /api/timeline
// @access Private
const registerTimeline = asyncHandler(async (req, res) => {
  const { residentId, roomId, timelineLog = [] } = req.body

  if (!residentId
    || !roomId) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const timeline = await Timeline.create({
    residentId,
    timelineLog,
    roomId,
  })

  if (timeline) {
    res.status(201).json({
      _id: timeline._id,
      residentId: timeline.familyMemberId,
      timelineLog: timeline.timelineLog,
      roomId: timeline.roomId,
    })
  } else {
    res.status(400)
    throw new Error('Invalid timeline data')
  }
})

// @desc get conversation list
// @route  GET /api/timeline
// @access Private
const getTimeline = asyncHandler(async (req, res) => {
  const timeline = await Timeline.find()

  res.status(201).json(timeline)
})

// @desc update chat log
// @route  PUT /api/timeline/:residentId
// @access Private
const updateTimelineLog = asyncHandler(async (req, res) => {
  const residentTimeline = await Timeline.findOne({ residentId: req.params.residentId })
  if (!residentTimeline) {
    const timeline = await Timeline.create(req.body)
    res.status(200).json(timeline)
  } else {
    const updatedResidentTimeline = await Timeline.findByIdAndUpdate(residentTimeline._id, req.body, { new: true })
    res.status(200).json(updatedResidentTimeline)
  }

})

// @desc get chat log
// @route  GET /api/timeline/:residentId
// @access Private
const getTimelineLog = asyncHandler(async (req, res) => {
  const residentTimeline = await Timeline.findOne({ residentId: req.params.residentId })
  if (!residentTimeline) {
    res.status(400)
    throw new Error('Timeline not found')
  }

  res.status(200).json(residentTimeline)
})

module.exports = {
  registerTimeline,
  getTimelineLog,
  updateTimelineLog,
  getTimeline
}