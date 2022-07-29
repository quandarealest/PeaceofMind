const express = require('express')
const router = express.Router()
const {
  registerTimeline,
  getTimelineLog,
  updateTimelineLog,
  getTimeline
} = require('../controllers/timelineController')
const { protect } = require('../middleware/authMiddleware')

//timeline functions
router.route('/').post(registerTimeline).get(getTimeline)
router.route('/:residentId').put(updateTimelineLog).get(getTimelineLog)

module.exports = router