const mongoose = require('mongoose')

const residentNoteSchema = mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Resident'
  },
  noteType: {
    type: String,
    require: [true, 'Please enter a note type']
  },
  note: {
    type: String,
    require: [true, 'Please enter a note']
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('ResidentNote', residentNoteSchema)