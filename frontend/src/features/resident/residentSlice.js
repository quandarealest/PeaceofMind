import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import residentService from './residentService'
import timelineService from '../timeline/timelineService'

const initialState = {
  residents: [],
  isError: false,
  isSuccess: false,
  isCRUDNoteSuccess: false,
  isLoading: false,
  message: '',
  detail: {}
}
// create new resident
export const createResident = createAsyncThunk('resident/create', async ({ newMedical, newResident, newFamily, newNote, token }, thunkAPI) => {
  try {
    return await residentService.registerResident(newResident, newFamily, newMedical, newNote, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// create new note
export const registerNewNote = createAsyncThunk('resident/newNote', async ({ newNote, token }, thunkAPI) => {
  try {
    return await residentService.registerResidentNote(token, newNote)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// delete note
export const deleteNote = createAsyncThunk('resident/deleteNote', async ({ id, token }, thunkAPI) => {
  try {
    return await residentService.removeNote(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update note
export const updateNote = createAsyncThunk('resident/updateNote', async ({ id, noteData, token }, thunkAPI) => {
  try {
    return await residentService.updateNote(id, noteData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

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
    reset: (state) => initialState,
    resetCRUDNote: (state) => ({ ...state, isCRUDNoteSuccess: false })
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
        state.isSuccess = false
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
      .addCase(registerNewNote.pending, state => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(registerNewNote.fulfilled, (state, action) => {
        const newNote = action.payload
        const newNoteList = state.detail.notes.notes.map(note => {
          if (note.noteType === newNote.noteType) {
            return {
              noteType: note.noteType,
              records: [
                ...note.records,
                {
                  _id: newNote._id,
                  note: newNote.note,
                  updatedAt: newNote.updatedAt,
                  createdId: newNote.createdId,
                  shareableId: newNote.shareableId,
                  createdUser: newNote.createdUser
                }
              ]
            }
          } else {
            return {
              noteType: note.noteType,
              records: [
                {
                  _id: newNote._id,
                  note: newNote.note,
                  updatedAt: newNote.updatedAt,
                  createdId: newNote.createdId,
                  shareableId: newNote.shareableId,
                  createdUser: newNote.createdUser
                }
              ]
            }
          }
        })
        state.detail.notes = {
          residentId: state.detail.notes.residentId,
          notes: newNoteList
        }
        state.isSuccess = true
        state.isCRUDNoteSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(registerNewNote.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteNote.pending, state => {
        state.isLoading = true
        state.isCRUDNoteSuccess = false
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const removedNoteId = action.payload
        const newNoteList = state.detail.notes.notes.map(note => {
          return {
            ...note,
            records: note.records.filter(rec => rec._id !== removedNoteId.id)
          }
        })
        state.detail.notes = {
          residentId: state.detail.notes.residentId,
          notes: newNoteList
        }
        state.isCRUDNoteSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isCRUDNoteSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateNote.pending, state => {
        state.isLoading = true
        state.isSuccess = false
        state.isCRUDNoteSuccess = false
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const newNoteList = state.detail.notes.notes.map(note => {
          if (note.noteType === action.payload.noteType) {
            return {
              ...note,
              records: [
                ...note.records.filter(rec => rec._id !== action.payload._id),
                {
                  _id: action.payload._id,
                  note: action.payload.note,
                  updatedAt: action.payload.updatedAt,
                  createdId: action.payload.createdId,
                  shareableId: action.payload.shareableId,
                  createdUser: action.payload.createdUser
                }
              ]
            }
          } else return note
        })
        state.detail.notes = {
          residentId: state.detail.notes.residentId,
          notes: newNoteList
        }
        state.isCRUDNoteSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isCRUDNoteSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createResident.pending, state => {
        state.isLoading = true
      })
      .addCase(createResident.fulfilled, (state, action) => {
        // state.residents = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = ''
      })
      .addCase(createResident.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset, resetCRUDNote } = residentSlice.actions
export default residentSlice.reducer