const express = require('express')
const router = express.Router()
const {
  registerResident,
  registerFamilyMember,
  getResidentList,
  getResidentDetail,
  getFamilyMemberDetail
} = require('../controllers/residentController')
const { protect } = require('../middleware/authMiddleware')

//resident functions 
router.route('/').post(protect, registerResident).get(protect, getResidentList)
router.route('/:id').get(getResidentDetail)
router.route('/family').post(registerFamilyMember)
router.route('/family/:id').get(getFamilyMemberDetail)
// router.route('/resident/:id').get(protect, getResidentDetail).put(protect, editResidentDetail).delete(protect, removeResident)

module.exports = router