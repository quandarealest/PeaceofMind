const asyncHandler = require('express-async-handler')
const FamilyMember = require('../models/residentFamilyModel')
const Resident = require('../models/residentModel')

// @desc Register new resident
// @route  POST /api/resident
// @access Private

const registerResident = asyncHandler(async (req, res) => {
  const {
    userId,
    supervisorEmployeeId,
    firstName,
    lastName,
    contactNumber,
    residentNumber,
    roomNumber,
    gender,
    dob,
    familyMemberId} = req.body
  if (!firstName
    || !lastName
    || !contactNumber
    || !residentNumber
    || !roomNumber
    || !gender
    || !dob
    || !supervisorEmployeeId
    ||!familyMemberId
    ||! userId) {
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
    userId,
    firstName,
    lastName,
    contactNumber,
    residentNumber,
    roomNumber,
    gender,
    dob,
    supervisorEmployeeId,
    familyMemberId
  })
  console.log(resident)
  if (resident) {
    res.status(201).json({
      _id: resident._id,
      userId: resident.userId,
      supervisorEmployeeId: resident.supervisorEmployeeId,
      familyMemberId:resident.familyMemberId,
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
    throw new Error('Invalid resident data')
  }
})

// @desc get employee list
// @route  GET /api/resident
// @access Private
const getResidentList = asyncHandler(async (req, res) => {
  const residentList = await Resident.find()

  res.status(200).json(residentList)
})

// @desc get employee detail
// @route  GET /api/resident/:id
// @access Private
const getResidentDetail = asyncHandler(async (req, res) => {
  const resident = await Resident.findOne({ userId: req.params.id })
  if (!resident) {
    res.status(400)
    throw new Error('Resident not found')
  }
  res.status(200).json(resident)
})


// --- FAMILY MEMBER --


// @desc Register new family member
// @route  POST /api/resident/family
// @access Private

const registerFamilyMember = asyncHandler(async (req, res) => {
  const {
    residentId,
    userId,
    firstName,
    lastName,
    contactNumber,
    emergencyContact,
  } = req.body
  if (!firstName
    || !lastName
    || !contactNumber
    || !residentId
    || !userId
    || !emergencyContact) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  //check if employee number exist
  // const residentNoExist = await Resident.findOne({ residentNumber })
  // if (residentNoExist) {
  //   res.status(409)
  //   throw new Error('Resident number already exist')
  // }

  const member = await FamilyMember.create({
    userId,
    residentId,
    emergencyContact,
    firstName,
    lastName,
    contactNumber,
  })

  if (member) {
    res.status(201).json({
      _id: member._id,
      userId: member.userId,
      residentId: member.residentId,
      firstName: member.firstName,
      lastName: member.lastName,
      contactNumber: member.contactNumber,
      emergencyContact: member.emergencyContact
    })
  } else {
    res.status(400)
    throw new Error('Invalid resident family member data')
  }
})

// @desc get family list
// @route  GET /api/resident/family
// @access Private
const getFamilyMemberList = asyncHandler(async (req, res) => {
  const familyList = await FamilyMember.find()

  res.status(200).json(familyList)
})

// @desc get family detail
// @route  GET /api/resident/family/:id
// @access Private
const getFamilyMemberDetail = asyncHandler(async (req, res) => {
  const member = await FamilyMember.findOne({ userId: req.params.id })
  if (!member) {
    res.status(400)
    throw new Error('Family member not found')
  }
  res.status(200).json(member)
})

module.exports = {
  registerResident,
  getResidentList,
  registerFamilyMember,
  getResidentDetail,
  getFamilyMemberDetail,
  getFamilyMemberList,
}