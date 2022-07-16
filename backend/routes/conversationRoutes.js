const express = require('express')
const router = express.Router()
const {
  registerConversation,
  getConversationList,
  updateChatLog,
} = require('../controllers/conversationController')
const { protect } = require('../middleware/authMiddleware')

//conversation functions
router.route('/').post(registerConversation).get(getConversationList)
router.route('/:roomId').put(updateChatLog)
// .put(protect, editEmployeeDetail).delete(protect, removeEmployee)

module.exports = router