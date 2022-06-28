const mongoose = require('mongoose')

const residentSpecialMedicalRecordSchema = mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Resident'
  },
  recordType: {
    type: String,
    require: [true, 'Please input a record type']
  },
  recordTitle: {
    type: String,
    require: [true, 'Please input a record title']
  },
  recordDescription: {
    type: String,
    require: [true, 'Please input a record description']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('ResidentSpecialMedicalRecord', residentSpecialMedicalRecordSchema)