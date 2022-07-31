import axios from 'axios'
import { EMP_API_URL, USER_API_URL } from '../../common/api'

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
  const user = await axios.get(USER_API_URL + id, config)
  return {
   ...response.data,
    user: user.data
  } 
}

//remove note
const deleteEmployee = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(EMP_API_URL + id, config)
  const user = await axios.delete(USER_API_URL + id, config)

  return {
    ...response.data,
    employeeUserData: user.data
  }
}

const employeeService = {
  getEmployeeList,
  getEmployeeDetail,
  createEmployee,
  updateEmployee,
  deleteEmployee
}

export default employeeService