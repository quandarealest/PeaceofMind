const express = require('express')
const router = express.Router()
const {
  registerEmployee,
  // getEmployeeList,
  // getEmployeeDetail,
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
router.route('/').post(protect, registerEmployee)
// .get(protect, getEmployeeList)
// router.route('/employee/:id').get(protect, getEmployeeDetail).put(protect, editEmployeeDetail).delete(protect, removeEmployee)

//resident functions 
// router.route('/resident/').post(protect, registerResident).get(protect, getResidentList)
// router.route('/resident/:id').get(protect, getResidentDetail).put(protect, editResidentDetail).delete(protect, removeResident)

module.exports = router