import axios from 'axios'
import { RES_API_URL, MED_API_URL } from '../../common/api'
import employeeService from '../employee/employeeService'
import { normalizedSpecialMedicalRecord } from '../../common/NormalizingData'

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

const getResidentInformation = async (id) => {
  const response = await axios.get(RES_API_URL + id)
  const basicMedicalRecord = await axios.get(MED_API_URL + 'basic/' + response.data.userId)
  const specialMedicalRecord = await axios.get(MED_API_URL + 'special/' + response.data.userId)

  return {
    ...response.data,
    basicMedicalRecord: basicMedicalRecord.data,
    specialMedicalRecord: normalizedSpecialMedicalRecord(specialMedicalRecord.data, response.data.userId)
  }
}

//get family member detail
const getFamilyMemberDetail = async (id) => {
  const response = await axios.get(RES_API_URL + '/family/' + id)

  return response.data
}

const residentService = {
  getResidentList,
  getResidentDetail,
  getFamilyMemberDetail,
  getResidentInformation
}

export default residentService