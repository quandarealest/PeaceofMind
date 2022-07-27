const express = require('express')
const router = express.Router()
const {
  registerNote,
  getNoteList,
  deleteNote,
  updateNote
} = require('../controllers/noteController')
const { protect } = require('../middleware/authMiddleware')

//note functions
router.route('/').post(registerNote)
router.route('/:residentId').get(getNoteList)
router.route('/:id').delete(protect, deleteNote).put(protect, updateNote)

module.exports = router