const express = require('express')
const router = express.Router()
const {
  registerEmployee,
  getEmployeeList,
  getEmployeeDetail,
  // getResidentList,
  // getResidentDetail,
  // registerResident,
  // editEmployeeDetail,
  // removeEmployee,
  // editResidentDetail,
  // removeResident
} = require('../controllers/employeeController')
const { protect } = require('../middleware/authMiddleware')

//employee functions
router.route('/').post(protect, registerEmployee).get(protect, getEmployeeList)
router.route('/:id').get(protect, getEmployeeDetail)
// .put(protect, editEmployeeDetail).delete(protect, removeEmployee)

module.exports = router