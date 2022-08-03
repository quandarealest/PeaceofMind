const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
// @route  POST /api/user/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    userName,
    password,
    email,
    role } = req.body
  if (!userName
    || !password
    || !email
    || !role) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  //check if user exist 
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(409)
    throw new Error('User already exist')
  }

  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user 
  const user = await User.create({
    userName,
    password: hashedPassword,
    email,
    role,
    isActivated: true,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      isActivated: user.isActivated,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Authenticate user
// @route  POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  //check if user's email exist
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      isActivated: user.isActivated,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

// @desc get user list
// @route  GET /api/user
// @access Private

const getUserList = asyncHandler(async (req, res) => {
  const userList = await User.find()

  res.status(200).json(userList)
})

// @desc get user detail
// @route  GET /api/user/:id
// @access Private

const getUserDetail = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  // check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  res.status(200).json(user)
})

module.exports = {
  registerUser,
  loginUser,
  getUserList,
  getUserDetail
}