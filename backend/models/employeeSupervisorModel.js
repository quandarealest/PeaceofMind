const mongoose = require('mongoose')

const employeeSupervisorSchema = mongoose.Schema({
  caregiverEmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Employee'
  },
  supervisorEmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Employee'
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('EmployeeSupervisor', employeeSupervisorSchema)