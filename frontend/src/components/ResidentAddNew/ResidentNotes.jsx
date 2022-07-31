import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useLocation, useNavigate } from 'react-router-dom'
import { FormControl, RadioGroup, Radio, InputLabel, Select, MenuItem } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import {Box,Checkbox,ListItemText} from '@mui/material'
import { NoteType } from '../ResidentDetail/ResidentEnum'
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

export default function ResidentNotes (props) {
    const theme = useTheme();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ResidentNote, setResidentNote] =useState('');
    const [personName, setPersonName] = useState([]);
    const [noteOption, setNoteOption] = useState(NoteType[0].value);
    const { user } = useSelector(state => state.auth)
    const { employees, isError, isLoading: employeeLoading, message } = useSelector(state => state.employees)
    console.log(user._id)
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
    
  const handleAddShareableUser = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
    const handleNote = (e) => {
      e.preventDefault()
      const newNote={
        residentId:"62e6f1c4f768be71f389bfdd", 
        createdId:user._id,
        shareableId:personName,
        noteType:noteOption,
        note: ResidentNote.trim()
      }
      dispatch(registerNewNote({newNote, token: user.token}))
    }
    return (
        <>     
        <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
                <InputLabel id="NoteTypelabel">Note Type</InputLabel>
                <Select
                    labelId="NoteType"
                    id="NoteType"
                    value={noteOption}
                    label="NoteType"
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
        
        <Grid item xs={12} sm={12}>
            <TextField
            multiline
            rows={5}
            maxRows={Infinity}
            fullWidth
            id="AddingNote"
            label="Adding Note"
            name="Adding Note"
            autoComplete="AddingNote"
            value={ResidentNote}
            onChange={e => setResidentNote(e.target.value)} 
            />
        </Grid>    
        <Grid item xs={12} sm={12}>
                <Button variant="contained" color="primary" type='submit' fullWidth onClick={handleNote}>
                        Save
                </Button>
        </Grid>
  </>
    );
  }
