const express = require('express')
const router = express.Router()
const {
  registerEmployee,
  getEmployeeList,
  getEmployeeDetail,
  updateEmployee,
  deleteEmployee,
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
router.route('/:id').get(protect, getEmployeeDetail).put(protect, updateEmployee).delete(protect, deleteEmployee)
// .put(protect, editEmployeeDetail).delete(protect, removeEmployee)

module.exports = router