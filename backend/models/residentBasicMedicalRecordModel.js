const mongoose = require('mongoose')

const residentBasicMedicalRecordSchema = mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Resident'
  },
  bloodGroup: {
    type: String,
    require: [true, 'Please enter resident blood group']
  },
  weight: {
    type: String,
    require: [true, 'Please enter resident weight']
  },
  height: {
    type: String,
    require: [true, 'Please enter resident height']
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('ResidentBasicMedicalRecord', residentBasicMedicalRecordSchema)