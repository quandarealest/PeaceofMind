const express = require('express')
const router = express.Router()
const { loginUser,
  registerUser,
  getUserList,
  getUserDetail,
  deleteUser,
  updateUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

//for userController
router.route('/').post(registerUser).get(protect, getUserList)
router.route('/login').post(loginUser)
router.route('/:id').get(protect, getUserDetail).delete(protect, deleteUser).put(protect, updateUser)

module.exports = router