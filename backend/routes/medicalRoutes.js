const express = require('express')
const router = express.Router()
const {
  registerBasicMedicalRecord,
  registerSpecialMedicalRecord,
  getSpecialMedicalRecordList,
  getBasicMedicalRecordList,
} = require('../controllers/medicalController')
const { protect } = require('../middleware/authMiddleware')

//conversation functions
router.route('/basic').post(registerBasicMedicalRecord)
router.route('/special').post(registerSpecialMedicalRecord)
router.route('/basic/:residentId').get(getBasicMedicalRecordList)
router.route('/special/:residentId').get(getSpecialMedicalRecordList)
// .put(protect, editEmployeeDetail).delete(protect, removeEmployee)

module.exports = router