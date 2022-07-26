const express = require('express')
const router = express.Router()
const {
  registerNote,
  getNoteList,
} = require('../controllers/noteController')
const { protect } = require('../middleware/authMiddleware')

//note functions
router.route('/').post(registerNote)
router.route('/:residentId').get(getNoteList)

module.exports = router