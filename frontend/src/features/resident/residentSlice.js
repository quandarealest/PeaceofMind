import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import residentService from './residentService'

const initialState = {
  residents: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  detail: {}
}

// get resident list
export const getResidentList = createAsyncThunk('resident/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await residentService.getResidentList(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getResidentDetail = createAsyncThunk('resident/getDetail', async ({ userId, token }, thunkAPI) => {
  try {
    return await residentService.getResidentInformation(userId, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const residentSlice = createSlice({
  name: 'resident',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getResidentList.pending, state => {
        state.isLoading = true
      })
      .addCase(getResidentList.fulfilled, (state, action) => {
        state.residents = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(getResidentList.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getResidentDetail.pending, state => {
        state.isLoading = true
      })
      .addCase(getResidentDetail.fulfilled, (state, action) => {
        state.detail = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(getResidentDetail.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = residentSlice.actions
export default residentSlice.reducer