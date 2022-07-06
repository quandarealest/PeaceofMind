import axios from 'axios'
import { USER_API_URL } from '../../common/api'

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
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
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