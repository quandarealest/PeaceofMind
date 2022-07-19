import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import conversationService from './conversationService'

const initialState = {
  chatList: [],
  activeChat: {},
  isError: false,
  isSuccess: false,
  isChatListLoading: false,
  isConversationLoading: false,
  message: ''
}

// get resident list
export const getChatList = createAsyncThunk('conversation/getAll', async (_, thunkAPI) => {
  try {
    // const token = thunkAPI.getState().auth.user.token
    return await conversationService.getChatList()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// get active chat
export const getActiveChat = createAsyncThunk('conversation/activeChat', async (roomId, thunkAPI) => {
  try {
    return await conversationService.getChatLog(roomId)
  } catch (error) {
    const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})

// get active chat
export const updateChatLog = createAsyncThunk('conversation/updateChat', async ({ roomId, updatedConversation, onSaveDB }, thunkAPI) => {
  try {
    console.log(onSaveDB)
    if (onSaveDB) {
      return await conversationService.updateChatLog(roomId, updatedConversation)
    } else {
      return updatedConversation
    }
  } catch (error) {
    const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getChatList.pending, state => {
        state.isChatListLoading = true
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        state.chatList = action.payload
        state.isSuccess = true
        state.isChatListLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(getChatList.rejected, (state, action) => {
        state.isSuccess = false
        state.isChatListLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getActiveChat.pending, state => {
        state.isConversationLoading = true
      })
      .addCase(getActiveChat.fulfilled, (state, action) => {
        const prevChat = state.chatList.find(chat => chat.roomId === action.payload.roomId)
        state.activeChat = {
          ...action.payload,
          familyMemberInfo: prevChat.familyMemberInfo,
          residentInfo: prevChat.residentInfo
        }
        state.isSuccess = true
        state.isConversationLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(getActiveChat.rejected, (state, action) => {
        state.isSuccess = false
        state.isConversationLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateChatLog.fulfilled, (state, action) => {
        state.chatList = [...state.chatList.filter(chat => chat.roomId !== action.payload.roomId), {
          ...action.payload,
          familyMemberInfo: state.activeChat.familyMemberInfo,
          residentInfo: state.activeChat.residentInfo
        }]
        state.activeChat = {
          ...action.payload,
          familyMemberInfo: state.activeChat.familyMemberInfo,
          residentInfo: state.activeChat.residentInfo
        }
        state.isSuccess = true
        state.isError = false
        state.message = ''
      })
      .addCase(updateChatLog.rejected, (state, action) => {
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = conversationSlice.actions
export default conversationSlice.reducer