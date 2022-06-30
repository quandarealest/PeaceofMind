const express = require('express')
const router = express.Router()
const { loginUser,
  registerUser,
  // getProfile 
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

//for userController
router.post('/', registerUser)
router.post('/login', loginUser)
// router.get('/profile', protect, getProfile)


module.exports = router