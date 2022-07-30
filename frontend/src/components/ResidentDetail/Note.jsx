import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  TextField,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Paper,
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  Checkbox,
  ListItemText
} from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

import { NoteType } from './ResidentEnum'
import { normalizeDate } from '../../common/NormalizingData'
import { getEmployeeList, reset } from '../../features/employee/employeeSlice'
import { registerNewNote, deleteNote, updateNote } from '../../features/resident/residentSlice'
const style1 = {
  marginBottom: 2,
};

const style2 = {
  marginTop: 1,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Note(props) {
  const theme = useTheme();
  const dispatch = useDispatch()
  const { noteRecord, user, detail, isLoading } = props
  const { employees, isError, isLoading: employeeLoading, message } = useSelector(state => state.employees)
  const [noteOption, setNoteOption] = useState(NoteType[0].value);
  const [updatingNoteValue, setUpdatingNoteValue] = useState('');
  const [updatingNoteId, setUpdatingNoteId] = useState('');
  const [newNoteValue, setNewNoteValue] = useState('');
  const [personName, setPersonName] = useState([]);
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    return () => {
      dispatch(reset())
    }
  }, [isError, message, employeeLoading])

  const handleChangeOption = (event) => {
    setNoteOption(event.target.value);
    if (event.target.value === 'Private Note') {
      dispatch(getEmployeeList(user.token))
    }
  };

  const handleAddNewNote = (e) => {
    e.preventDefault()
    const newNote = {
      residentId: detail.userId,
      createdId: user._id,
      noteType: noteOption,
      note: newNoteValue.trim(),
      shareableId: personName
    }
    dispatch(registerNewNote({ newNote, token: user.token }))
  }

  const handleUpdateNote = (e, oldNote, noteType) => {
    e.preventDefault()
    const updatedNote = {
      residentId: detail.userId,
      createdId: user._id,
      noteType: noteType,
      note: updatingNoteValue.trim(),
      shareableId: oldNote.shareableId
    }
    dispatch(updateNote({ id: updatingNoteId, noteData: updatedNote, token: user.token }))
  }

  const handleAddShareableUser = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleRemoveNote = (e, id) => {
    e.preventDefault()
    dispatch(deleteNote({ id, token: user.token }))
  }

  return (
    <>
      <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
        <Grid xs={11} container spacing={0.5} sx={style1}>
          <Grid item xs={12}>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-select-small">Note Type</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={noteOption}
                label="Note Type"
                onChange={handleChangeOption}
              >
                {NoteType.map(opt => <MenuItem value={opt.value}>{opt.label}</MenuItem>)}
              </Select>
            </FormControl>
            {noteOption === 'Private Note' && (
              <FormControl size="small" fullWidth sx={{ marginTop: 1, marginBottom: 1 }}>
                <InputLabel id="demo-multiple-chip-label">Shareable User</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  disabled={employees.length === 0}
                  value={personName}
                  onChange={handleAddShareableUser}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const selectedUser = employees.find(emp => emp.userId === value)
                        const displayLabel = `${selectedUser.firstName} ${selectedUser.lastName}`
                        return (
                          <Chip key={value} label={displayLabel} />
                        )
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {employees.length !== 0 && employees.filter(emp => emp.userId !== user._id).map((emp) => (
                    <MenuItem
                      key={emp.userId}
                      value={emp.userId}
                      style={getStyles(emp.userId, personName, theme)}
                    >
                      <Checkbox checked={personName.indexOf(emp.userId) > -1} />
                      <ListItemText primary={`${emp.firstName} ${emp.lastName} - ${emp.employeeNumber}`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="timeline-text"
                label="Write Text"
                multiline
                rows={2}
                value={newNoteValue}
                onChange={e => setNewNoteValue(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid container sx={style2} justifyContent="flex-end">
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleAddNewNote}
              disabled={newNoteValue === ''}
            >
              Share
            </Button>
          </Grid>
        </Grid>
        <Divider light />
        <Grid xs={11} container spacing={0.5}>
          {isLoading ? (
            <>
              Loading
          </>) : (
              <>
                {(Object.keys(noteRecord).length !== 0 || noteRecord !== undefined) ? (
                  <>
                    {noteRecord.notes.map(note => {
                      const { noteType, records } = note
                      return (
                        <Accordion sx={{ width: '100%' }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>{noteType}</Typography>
                          </AccordionSummary>
                          {noteType === 'Private Note' ? (<>
                            {records.map(rec => {
                              const { _id, note, updatedAt, createdId, shareableId, createdUser } = rec
                              if (shareableId.length > 0 && shareableId.includes(user._id) || (user._id === createdId)) {
                                return (
                                  <AccordionDetails>
                                    <Card>
                                      <CardContent>
                                        <Typography gutterBottom variant="caption" component="div">
                                          {`${createdUser.firstName} ${createdUser.lastName} - ${normalizeDate(new Date(updatedAt))}`}
                                        </Typography>
                                        {updatingNoteId === _id ? (
                                          <TextField
                                            fullWidth
                                            hiddenLabel
                                            id="filled-hidden-label-small"
                                            size="small"
                                            value={updatingNoteValue}
                                            onChange={(e) => setUpdatingNoteValue(e.target.value)}
                                          />
                                        ) : (
                                            <Typography variant="body1" color="text.secondary">
                                              { note}
                                            </Typography>
                                          )}
                                      </CardContent>
                                      <CardActions>
                                        {updatingNoteId === _id ? (
                                          <>
                                            <Button
                                              disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false}
                                              size="small"
                                              disabled={updatingNoteValue === ''}
                                              onClick={(e) => handleUpdateNote(e, rec, noteType)}
                                            >
                                              Save
                                            </Button>
                                            <Button
                                              disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false}
                                              size="small"
                                              color="error"
                                              onClick={(e) => {
                                                e.preventDefault()
                                                setUpdatingNoteId('')
                                                setUpdatingNoteValue('')
                                              }}
                                            >Cancel</Button>
                                          </>
                                        ) : (
                                            <>
                                              <Button
                                                disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false}
                                                size="small"
                                                onClick={(e) => {
                                                  e.preventDefault()
                                                  setUpdatingNoteId(_id)
                                                  setUpdatingNoteValue(note)
                                                }}
                                              >
                                                Update</Button>
                                              <Button
                                                disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false}
                                                size="small"
                                                onClick={(e) => handleRemoveNote(e, _id)}
                                              >Remove</Button>
                                            </>
                                          )}
                                      </CardActions>
                                    </Card>
                                  </AccordionDetails>
                                )
                              } else {
                                return <></>
                              }
                            })}
                          </>) : (
                              <>
                                {records.map(rec => {
                                  const { _id, note, updatedAt, createdId, shareableId, createdUser } = rec
                                  return (
                                    <AccordionDetails>
                                      <Card>
                                        <CardContent>
                                          <Typography gutterBottom variant="caption" component="div">
                                            {`${createdUser.firstName} ${createdUser.lastName} - ${normalizeDate(new Date(updatedAt))}`}
                                          </Typography>
                                          {updatingNoteId === _id ? (
                                            <TextField
                                              fullWidth
                                              hiddenLabel
                                              id="filled-hidden-label-small"
                                              size="small"
                                              value={updatingNoteValue}
                                              onChange={(e) => setUpdatingNoteValue(e.target.value)}
                                            />
                                          ) : (
                                              <Typography variant="body1" color="text.secondary">
                                                {note}
                                              </Typography>
                                            )}
                                        </CardContent>
                                        <CardActions>
                                          {updatingNoteId === _id ? (
                                            <>
                                              <Button
                                                disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false}
                                                size="small"
                                                disabled={updatingNoteValue === ''}
                                                onClick={(e) => handleUpdateNote(e, rec, noteType)}
                                              >
                                                Save
                                            </Button>
                                              <Button
                                                disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false}
                                                size="small"
                                                color="error"
                                                onClick={(e) => {
                                                  e.preventDefault()
                                                  setUpdatingNoteId('')
                                                  setUpdatingNoteValue('')
                                                }}
                                              >Cancel</Button>
                                            </>
                                          ) : (
                                              <>
                                                <Button
                                                  disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false}
                                                  size="small"
                                                  onClick={(e) => {
                                                    e.preventDefault()
                                                    setUpdatingNoteId(_id)
                                                    setUpdatingNoteValue(note)
                                                  }}
                                                >
                                                  Update</Button>
                                                <Button
                                                  disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false}
                                                  size="small"
                                                  onClick={(e) => handleRemoveNote(e, _id)}
                                                >Remove</Button>
                                              </>
                                            )}

                                        </CardActions>
                                      </Card>
                                    </AccordionDetails>
                                  )
                                })}
                              </>
                            )}
                        </Accordion>
                      )
                    })}
                  </>
                ) : (<Typography>No Note Record</Typography>)}
              </>
            )}
        </Grid>
      </Grid>
    </>
  )

}

export default Note
