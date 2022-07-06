import axios from 'axios'
import { RES_API_URL } from '../../common/api'
import employeeService from '../employee/employeeService'

//get employee list
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

const residentService = {
  getResidentList
}

export default residentService