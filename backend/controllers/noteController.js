const asyncHandler = require('express-async-handler')
// const ConversationFamilySupervisorModel = require('../models/conversationFamilySupervisorModel')
const Note = require('../models/residentNoteModel')

// @desc Register new basic medical record
// @route  POST /api/note
// @access Private
const registerNote = asyncHandler(async (req, res) => {
  const { residentId, createdId, shareableId, noteType, note } = req.body

  if (!residentId
    || !createdId
    || !noteType
    || !note) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const noteRecord = await Note.create({
    residentId,
    createdId,
    noteType,
    note,
    shareableId
  })

  if (noteRecord) {
    res.status(201).json({
      _id: noteRecord._id,
      residentId: noteRecord.residentId,
      createdId: noteRecord.createdId,
      noteType: noteRecord.noteType,
      note: noteRecord.note,
      shareableId: noteRecord.shareableId
    })
  } else {
    res.status(400)
    throw new Error('Invalid note record data')
  }
})

// @desc get conversation list
// @route  GET /api/note/:residentId
// @access Private
const getNoteList = asyncHandler(async (req, res) => {
  const noteRecord = await Note.find({ residentId: req.params.residentId })

  res.status(201).json(noteRecord)
})

module.exports = {
  registerNote,
  getNoteList,
}