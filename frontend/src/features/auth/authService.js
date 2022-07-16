import axios from 'axios'
import { USER_API_URL } from '../../common/api'
import employeeService from '../employee/employeeService'
import residentService from '../resident/residentService'

// register user
const register = async (userData) => {
  const response = await axios.post(USER_API_URL, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// login user
const login = async (userData) => {
  const response = await axios.post(USER_API_URL + 'login', userData)

  if (response.data) {
    if (response.data.role === 'supervisor' || response.data.role === 'supervisor') {
      const employeeInfo = await employeeService.getEmployeeDetail(response.data.token, response.data._id)
      localStorage.setItem('user', JSON.stringify({ ...response.data, info: employeeInfo }))
      return { ...response.data, info: employeeInfo }
    } else if (response.data.role === 'resident') {
      const residentInfo = await residentService.getResidentDetail(response.data._id)
      localStorage.setItem('user', JSON.stringify({ ...response.data, info: residentInfo }))
      return { ...response.data, info: residentInfo }
    } else if (response.data.role === 'family') {
      const familyMemberInfo = await residentService.getFamilyMemberDetail(response.data._id)
      localStorage.setItem('user', JSON.stringify({ ...response.data, info: familyMemberInfo }))
      return { ...response.data, info: familyMemberInfo }
    } else {
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    }
  }
}

//logout
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login
}

export default authService