import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import employeeService from './employeeService'

const initialState = {
  employees: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  employeeDetail: {}
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

//get employee details
export const getEmployeeDetail = createAsyncThunk('employee/getDetail', async ({ token, userId }, thunkAPI) => {
  try {
    return await employeeService.getEmployeeDetail(token, userId)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//create employee
export const createEmployee = createAsyncThunk('employee/create', async ({user, employee, token}, thunkAPI) =>{
  try {
    return await employeeService.createEmployee(user, employee, token)
  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateEmployee = createAsyncThunk('employee/update', async ({id, user, employee, token}, thunkAPI) =>{
  try {
    return await employeeService.updateEmployee(id, user, employee, token)
  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// delete employee
export const deleteEmployee = createAsyncThunk('resident/delete', async ({ id, token }, thunkAPI) => {
  try {
    return await employeeService.deleteEmployee(id, token)
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
      .addCase(getEmployeeDetail.pending, state => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(getEmployeeDetail.fulfilled, (state, action) => {
        state.employeeDetail = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(getEmployeeDetail.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateEmployee.pending, state => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.employeeDetail = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteEmployee.pending, state => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createEmployee.pending, state => {
        state.isLoading = true
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        const newEmployeeList = [
          ...state.employees,
          action.payload
        ]
        //console.log(newEmployeeList)
        state.employees = [...newEmployeeList]
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.employees = null
      })
  }
})

export const { reset } = employeeSlice.actions
export default employeeSlice.reducer