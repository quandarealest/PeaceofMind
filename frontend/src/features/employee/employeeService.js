import axios from 'axios'
import { EMP_API_URL } from '../../common/api'


//get employee list
const getEmployeeList = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(EMP_API_URL, config)

  return response.data
}

const getEmployeeDetail = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(EMP_API_URL + id, config)

  return response.data
}

const employeeService = {
  getEmployeeList,
  getEmployeeDetail
}

export default employeeService