const express = require('express')
const router = express.Router()
const {
  registerConversation,
} = require('../controllers/conversationController')
const { protect } = require('../middleware/authMiddleware')

//conversation functions
router.route('/').post(registerConversation)
// router.route('/').post(protect, registerEmployee).get(protect, getEmployeeList)
// router.route('/:id').get(protect, getEmployeeDetail)
// .put(protect, editEmployeeDetail).delete(protect, removeEmployee)

module.exports = router