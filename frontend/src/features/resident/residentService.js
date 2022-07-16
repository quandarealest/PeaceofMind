import axios from 'axios'
import { RES_API_URL } from '../../common/api'
import employeeService from '../employee/employeeService'

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

//get family member detail
const getFamilyMemberDetail = async (id) => {
  const response = await axios.get(RES_API_URL + '/family/' + id)

  return response.data
}

const residentService = {
  getResidentList,
  getResidentDetail,
  getFamilyMemberDetail
}

export default residentService