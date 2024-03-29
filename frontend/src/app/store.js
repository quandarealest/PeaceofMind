import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import employeeReducer from '../features/employee/employeeSlice'
import residentReducer from '../features/resident/residentSlice'
import conversationReducer from '../features/conversation/conversationSlice'
import timelineReducer from '../features/timeline/timelineSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    residents: residentReducer,
    conversation: conversationReducer,
    feed: timelineReducer
  }
})