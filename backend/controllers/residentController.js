const asyncHandler = require('express-async-handler')
const Employee = require('../models/employeeModel')
const Resident = require('../models/residentModel')

// @desc Register new employee
// @route  POST /api/resident
// @access Private

const registerResident = asyncHandler(async (req, res) => {
  const {
    supervisorEmployeeId,
    firstName,
    lastName,
    contactNumber,
    residentNumber,
    roomNumber,
    gender,
    dob } = req.body
  if (!firstName
    || !lastName
    || !contactNumber
    || !residentNumber
    || !roomNumber
    || !gender
    || !dob
    || !supervisorEmployeeId) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  //check if employee number exist
  const residentNoExist = await Resident.findOne({ residentNumber })
  if (residentNoExist) {
    res.status(409)
    throw new Error('Resident number already exist')
  }

  const resident = await Resident.create({
    userId: req.user.id,
    firstName,
    lastName,
    contactNumber,
    residentNumber,
    roomNumber,
    gender,
    dob,
    supervisorEmployeeId
  })

  if (resident) {
    res.status(201).json({
      _id: resident._id,
      userId: resident.userId,
      supervisorEmployeeId: resident.supervisorEmployeeId,
      firstName: resident.firstName,
      lastName: resident.lastName,
      contactNumber: resident.contactNumber,
      residentNumber: resident.residentNumber,
      roomNumber: resident.roomNumber,
      gender: resident.gender,
      dob: resident.dob
    })
  } else {
    res.status(400)
    throw new Error('Invalid employee data')
  }
})

// @desc get employee list
// @route  GET /api/resident
// @access Private

const getResidentList = asyncHandler(async (req, res) => {
  const residentList = await Resident.find()

  res.status(200).json(residentList)
})

module.exports = {
  registerResident,
  getResidentList
}