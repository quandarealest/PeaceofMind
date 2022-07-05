import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import employeeService from './employeeService'

const initialState = {
  employees: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// get employee list
export const getEmployeeList = createAsyncThunk('employee/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await employeeService.getEmployeeList(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getEmployeeList.pending, state => {
        state.isLoading = true
      })
      .addCase(getEmployeeList.fulfilled, (state, action) => {
        state.employees = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(getEmployeeList.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = employeeSlice.actions
export default employeeSlice.reducer