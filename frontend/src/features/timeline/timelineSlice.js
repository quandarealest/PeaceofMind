import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import timelineService from './timelineService'

const initialState = {
  feed: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// get active chat
export const getResidentTimeline = createAsyncThunk('timeline/getTimeline', async (residentId, thunkAPI) => {
  try {
    return await timelineService.getTimelineLog(residentId)
  } catch (error) {
    const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})

// update timeline feed
export const updateFeed = createAsyncThunk('timeline/updateFeed', async ({ updatedTimeline, isSaveDB }, thunkAPI) => {
  try {
    const { residentId } = updatedTimeline
    if (isSaveDB) {
      return await timelineService.updateTimelineLog(residentId, updatedTimeline)
    } else {
      return updatedTimeline
    }
  } catch (error) {
    const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})

export const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getResidentTimeline.pending, state => {
        state.isLoading = true
      })
      .addCase(getResidentTimeline.fulfilled, (state, action) => {
        state.feed = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(getResidentTimeline.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateFeed.fulfilled, (state, action) => {
        state.feed = action.payload
        state.isSuccess = true
        state.isError = false
        state.message = ''
      })
      .addCase(updateFeed.rejected, (state, action) => {
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = timelineSlice.actions
export default timelineSlice.reducer