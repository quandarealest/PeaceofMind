const asyncHandler = require('express-async-handler')
const Employee = require('../models/employeeModel')

// @desc Register new employee
// @route  POST /api/employee
// @access Private
const registerEmployee = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    contactNumber,
    employeeNumber } = req.body

  if (!firstName
    || !lastName
    || !contactNumber
    || !employeeNumber) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //check if employee number exist
  const employeeNoExist = await Employee.findOne({ employeeNumber })
  if (employeeNoExist) {
    res.status(409)
    throw new Error('Employee number already exist')
  }

  const employee = await Employee.create({
    userId: req.user.id,
    firstName,
    lastName,
    contactNumber,
    employeeNumber,
  })

  if (employee) {
    res.status(201).json({
      _id: employee._id,
      userId: employee.userId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      contactNumber: employee.contactNumber,
      employeeNumber: employee.employeeNumber,
    })
  } else {
    res.status(400)
    throw new Error('Invalid employee data')
  }
})

// @desc get employee list
// @route  GET /api/employee
// @access Private

const getEmployeeList = asyncHandler(async (req, res) => {
  const employeeList = await Employee.find()

  res.status(200).json(employeeList)
})

// @desc get employee detail
// @route  GET /api/employee/:id
// @access Private

const getEmployeeDetail = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ userId: req.params.id })

  if (!employee) {
    res.status(400)
    throw new Error('Employee not found')
  }

  // check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  res.status(200).json(employee)
})

module.exports = {
  registerEmployee,
  getEmployeeList,
  getEmployeeDetail
}