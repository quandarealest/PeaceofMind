const asyncHandler = require('express-async-handler')
// const ConversationFamilySupervisorModel = require('../models/conversationFamilySupervisorModel')
const BasicMedicalRecord = require('../models/residentBasicMedicalRecordModel')
const SpecialMedicalRecord = require('../models/residentSpecialMedicalRecordModel')

// @desc Register new basic medical record
// @route  POST /api/medical/basic
// @access Private
const registerBasicMedicalRecord = asyncHandler(async (req, res) => {
  const { residentId, bloodGroup, weight, height } = req.body

  if (!residentId
    || !bloodGroup
    || !weight
    || !height) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  //check if medical exist
  const recordExist = await BasicMedicalRecord.findOne({ residentId })
  if (recordExist) {
    res.status(409)
    throw new Error('Basic record already exist')
  }

  const basicMedicalRecord = await BasicMedicalRecord.create({
    residentId,
    bloodGroup,
    weight,
    height,
  })

  if (basicMedicalRecord) {
    res.status(201).json({
      _id: basicMedicalRecord._id,
      residentId: basicMedicalRecord.residentId,
      bloodGroup: basicMedicalRecord.bloodGroup,
      weight: basicMedicalRecord.weight,
      height: basicMedicalRecord.height
    })
  } else {
    res.status(400)
    throw new Error('Invalid basic medical record data')
  }
})

// @desc Register new special medical record
// @route  POST /api/medical/special
// @access Private
const registerSpecialMedicalRecord = asyncHandler(async (req, res) => {
  const { residentId, recordType, recordTitle, recordDescription } = req.body

  if (!residentId
    || !recordType
    || !recordTitle
    || !recordDescription) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  //check if medical exist
  const recordExist = await SpecialMedicalRecord.findOne({ residentId })
  if (recordExist) {
    res.status(409)
    throw new Error('Special record already exist')
  }

  const specialMedicalRecord = await SpecialMedicalRecord.create({
    residentId,
    recordType,
    recordTitle,
    recordDescription,
  })

  if (specialMedicalRecord) {
    res.status(201).json({
      _id: specialMedicalRecord._id,
      residentId: specialMedicalRecord.residentId,
      recordType: specialMedicalRecord.recordType,
      recordTitle: specialMedicalRecord.recordTitle,
      recordDescription: specialMedicalRecord.recordDescription
    })
  } else {
    res.status(400)
    throw new Error('Invalid special medical record data')
  }
})

// @desc get conversation list
// @route  GET /api/medical/basic/:residentId
// @access Private
const getBasicMedicalRecordList = asyncHandler(async (req, res) => {
  const basicMedicalRecordList = await BasicMedicalRecord.findOne({ residentId: req.params.residentId })

  res.status(201).json(basicMedicalRecordList)
})

// @desc get conversation list
// @route  GET /api/medical/special/:residentId
// @access Private
const getSpecialMedicalRecordList = asyncHandler(async (req, res) => {
  const specialMedicalRecordList = await SpecialMedicalRecord.find({ residentId: req.params.residentId })

  res.status(201).json(specialMedicalRecordList)
})

// @desc update chat log
// @route  PUT /api/message/:roomId
// @access Private
// const updateChatLog = asyncHandler(async (req, res) => {
//   const conversation = await Conversation.findOne({ roomId: req.params.roomId })
//   if (!conversation) {
//     res.status(400)
//     throw new Error('Conversation not found')
//   }

//   const updatedConversation = await Conversation.findByIdAndUpdate(conversation._id, req.body, { new: true })

//   res.status(200).json(updatedConversation)
// })

module.exports = {
  registerBasicMedicalRecord,
  registerSpecialMedicalRecord,
  getSpecialMedicalRecordList,
  getBasicMedicalRecordList,
  // updateChatLog,
}