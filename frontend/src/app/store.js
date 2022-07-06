import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import employeeReducer from '../features/employee/employeeSlice'
import residentReducer from '../features/resident/residentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    residents: residentReducer
  }
})