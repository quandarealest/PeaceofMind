import axios from 'axios'
import { USER_API_URL, RES_API_URL, MED_API_URL, NOTE_API_URL, TIMELINE_API_URL } from '../../common/api'
import employeeService from '../employee/employeeService'
import timelineService from '../timeline/timelineService'
import { normalizedSpecialMedicalRecord, normalizedNotes } from '../../common/NormalizingData'

//create new resident
const registerResident = async (newResident, newFamily, newMedical, newNote, token, roomId) => {
  const { user: residentUser } = newResident
  const { user: familyUser } = newFamily
  const { basicMedicalRecord, specialMedicalRecord } = newMedical
  const { diet, allergy, medication } = specialMedicalRecord
  const { specialNote, dailyNote, privateNote } = newNote
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  //create users for resident and family
  const resResidentUser = await axios.post(USER_API_URL, residentUser, config)
  const resFamilyUser = await axios.post(USER_API_URL, familyUser, config)

  //create resident
  const resResident = await axios.post(RES_API_URL, {
    userId: resResidentUser.data._id,
    familyMemberId: resFamilyUser.data._id,
    gender: newResident.gender,
    dob: newResident.dob,
    roomNumber: newResident.roomNumber,
    residentNumber: newResident.residentNumber,
    contactNumber: newResident.contactNumber,
    firstName: newResident.firstName,
    lastName: newResident.lastName,
    supervisorEmployeeId: newResident.supervisorEmployeeId
  }, config)

  //create family
  const resFamily = await axios.post(RES_API_URL + 'family/', {
    userId: resFamilyUser.data._id,
    residentId: resResidentUser.data._id,
    emergencyContact: newFamily.emergencyContact,
    contactNumber: newFamily.contactNumber,
    lastName: newFamily.lastName,
    firstName: newFamily.firstName,
  }, config)

  const resTimeline = await axios.post(TIMELINE_API_URL, {
    residentId: resResidentUser.data._id,
    roomId: roomId,
  })

  //create basic medical record
  const resBasicMedicalRecord = await axios.post(MED_API_URL + 'basic/', {
    residentId: resResidentUser.data._id,
    bloodGroup: basicMedicalRecord.bloodGroup,
    weight: basicMedicalRecord.weight,
    height: basicMedicalRecord.height
  })

  //create diet medical record
  if (diet.length !== 0) {
    diet.forEach(async (el) => {
      const resDiet = await axios.post(MED_API_URL + 'special/', {
        residentId: resResidentUser.data._id,
        recordType: 'Diet',
        recordTitle: el.recordTitle,
        recordDescription: el.recordDescription
      })
    });
  }

  //create allergy medical record
  if (allergy.length !== 0) {
    allergy.forEach(async (el) => {
      const resAllergy = await axios.post(MED_API_URL + 'special/', {
        residentId: resResidentUser.data._id,
        recordType: 'Allergies',
        recordTitle: el.recordTitle,
        recordDescription: el.recordDescription
      })
    });
  }

  //create medication medical record
  if (medication.length !== 0) {
    medication.forEach(async (el) => {
      const resMedication = await axios.post(MED_API_URL + 'special/', {
        residentId: resResidentUser.data._id,
        recordType: 'Medicines',
        recordTitle: el.recordTitle,
        recordDescription: el.recordDescription
      })
    });
  }

  //create daily note
  if (dailyNote.length !== 0) {
    dailyNote.forEach(async (el) => {
      const resDailyNote = await axios.post(NOTE_API_URL, {
        residentId: resResidentUser.data._id,
        createdId: el.createdId,
        shareableId: el.shareableId,
        noteType: el.noteType,
        note: el.note
      })
    });
  }

  //create special note
  if (specialNote.length !== 0) {
    specialNote.forEach(async (el) => {
      const resSpecialNote = await axios.post(NOTE_API_URL, {
        residentId: resResidentUser.data._id,
        createdId: el.createdId,
        shareableId: el.shareableId,
        noteType: el.noteType,
        note: el.note
      })
    });
  }

  //create special note
  if (privateNote.length !== 0) {
    privateNote.forEach(async (el) => {
      const resPrivateNote = await axios.post(NOTE_API_URL, {
        residentId: resResidentUser.data._id,
        createdId: el.createdId,
        shareableId: el.shareableId,
        noteType: el.noteType,
        note: el.note
      })
    });
  }

  return resResidentUser.data._id
}

//create new note for resident
const registerResidentNote = async (token, newNote) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(NOTE_API_URL, newNote)

  const createdUser = await employeeService.getEmployeeDetail(token, response.data.createdId)
  return {
    ...response.data,
    createdUser: createdUser
  }
}

// get resident detail info
const getResidentInformation = async (id, token) => {
  const response = await axios.get(RES_API_URL + id)
  const basicMedicalRecord = await axios.get(MED_API_URL + 'basic/' + response.data.userId)
  const specialMedicalRecord = await axios.get(MED_API_URL + 'special/' + response.data.userId)

  const notes = await axios.get(NOTE_API_URL + response.data.userId).then((res) => {
    const response = res.data;
    const notesWithCreatedUser = response.map(async (record) => {
      const createdUserDetail = await employeeService.getEmployeeDetail(token, record.createdId).then(detail => {
        return {
          ...record,
          createdUser: detail
        }
      })
      return createdUserDetail
    })
    return notesWithCreatedUser
  })

  return {
    ...response.data,
    basicMedicalRecord: basicMedicalRecord.data,
    specialMedicalRecord: normalizedSpecialMedicalRecord(specialMedicalRecord.data, response.data.userId),
    notes: normalizedNotes(await Promise.all(notes), response.data.userId),
  }
}

//get resident list
const getResidentList = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const residentList = await axios.get(RES_API_URL, config).then((res) => {
    const response = res.data
    const residentWithSupervisorDetailList = response.map(async (record) => {
      const supervisor = await employeeService.getEmployeeDetail(token, record.supervisorEmployeeId)
      const family = await getFamilyMemberDetail(record.familyMemberId)
      return {
        ...record,
        supervisor,
        family
      }
    })
    return residentWithSupervisorDetailList
  })
  return await Promise.all(residentList)
}

//get resident detail
const getResidentDetail = async (id) => {
  const response = await axios.get(RES_API_URL + id)

  return response.data
}


//get family member detail
const getFamilyMemberDetail = async (id) => {
  const response = await axios.get(RES_API_URL + 'family/' + id)

  return response.data
}

//get family member list
const getFamilyMemberList = async () => {
  const response = await axios.get(RES_API_URL + 'family/')

  return response.data
}


//remove note
const removeNote = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(NOTE_API_URL + id, config)
  return response.data
}

//update a note
const updateNote = async (id, noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(NOTE_API_URL + id, noteData, config)
  const createdUser = await employeeService.getEmployeeDetail(token, response.data.createdId)
  return {
    ...response.data,
    createdUser: createdUser
  }
}

const residentService = {
  registerResident,
  getResidentList,
  getResidentDetail,
  getFamilyMemberDetail,
  getFamilyMemberList,
  getResidentInformation,
  registerResidentNote,
  removeNote,
  updateNote
}

export default residentService