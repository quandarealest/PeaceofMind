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

const createEmployee = async (userData, employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const user = await axios.post(USER_API_URL, userData, config)
  const tempEmployeeData = {
    ...employeeData,
    userId: user.data._id,
  }
  const response = await axios.post(EMP_API_URL, tempEmployeeData, config)
  return response.data
}

const updateEmployee = async (id, userData, employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const user = await axios.put(USER_API_URL + id, userData, config)
  const response = await axios.put(EMP_API_URL + id, employeeData, config)
  return {
    ...response.data,
     user: user.data
   } 
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