const asyncHandler = require('express-async-handler')
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
      shareableId: noteRecord.shareableId,
      createdAt: noteRecord.createdAt,
      updatedAt: noteRecord.updatedAt
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

// @desc Delete note
// @route  DELETE /api/note/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const noteRecord = await Note.findById(req.params.id)

  if (!noteRecord) {
    res.status(400)
    throw new Error('Note not found')
  }


  // only the logged in user matches the note user
  if (noteRecord.createdId.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await noteRecord.remove()
  res.status(200).json({ id: req.params.id })
})

// @desc Update note
// @route  PUT /api/note/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const noteRecord = await Note.findById(req.params.id);

  if (!noteRecord) {
    res.status(400)
    throw new Error('Note not found')
  }

  // only the logged in user matches the note user
  if (noteRecord.createdId.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.status(200).json(updatedNote)
})

module.exports = {
  registerNote,
  getNoteList,
  deleteNote,
  updateNote,
}