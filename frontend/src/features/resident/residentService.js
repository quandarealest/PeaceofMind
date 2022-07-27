import axios from 'axios'
import { RES_API_URL, MED_API_URL, NOTE_API_URL } from '../../common/api'
import employeeService from '../employee/employeeService'
import { normalizedSpecialMedicalRecord, normalizedNotes } from '../../common/NormalizingData'

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

//get resident list
const getResidentList = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(RES_API_URL, config)

  const residentWithSupervisorDetailList = await response.data.map(async (res) => {
    const supervisor = await employeeService.getEmployeeDetail(token, res.supervisorEmployeeId)

    return {
      ...res,
      supervisor: supervisor
    }
  })

  return await Promise.all(residentWithSupervisorDetailList)
}

//get resident detail
const getResidentDetail = async (id) => {
  const response = await axios.get(RES_API_URL + id)

  return response.data
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
    notes: normalizedNotes(await Promise.all(notes), response.data.userId)
  }
}

//get family member detail
const getFamilyMemberDetail = async (id) => {
  const response = await axios.get(RES_API_URL + '/family/' + id)

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
  getResidentList,
  getResidentDetail,
  getFamilyMemberDetail,
  getResidentInformation,
  registerResidentNote,
  removeNote,
  updateNote
}

export default residentService