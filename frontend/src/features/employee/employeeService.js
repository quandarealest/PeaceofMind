import axios from 'axios'

const API_URL = '/api/employee/'

//get employee list
const getEmployeeList = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const employeeService = {
  getEmployeeList
}

export default employeeService