import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Grid,
  Box,
  Checkbox,
  Chip,
  OutlinedInput
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify'
import { NoteType } from '../ResidentDetail/ResidentEnum'
import { getEmployeeList } from '../../features/employee/employeeSlice'

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

export default function ResidentNotes(props) {
  const { createdNote, employees, user, isError, employeeLoading, message, handleAddNewNote } = props
  const { specialNote, dailyNote, privateNote } = createdNote
  const theme = useTheme();
  const dispatch = useDispatch();
  const [residentNote, setResidentNote] = useState('');
  const [personName, setPersonName] = useState([]);
  const [noteOption, setNoteOption] = useState(NoteType[0].value);
  useEffect(() => {
    if (isError) {
      toast.error(message)
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

  const handleAddNote = (e) => {
    e.preventDefault()

    handleAddNewNote({
      createdId: user._id,
      shareableId: personName,
      noteType: noteOption,
      note: residentNote.trim()
    })
    setResidentNote('')
    setPersonName([])
    // dispatch(registerNewNote({ newNote: Note, token: user.token }))
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
      {(specialNote.length !== 0 || dailyNote.length !== 0 || privateNote !== 0) && (
        <Grid item xs={12}>
          {dailyNote.length !== 0 && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Daily Notes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {dailyNote.map(el => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        // primary={el.recordTitle}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {el.note}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
          {specialNote.length !== 0 && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Special Notes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {specialNote.map(el => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        // primary={el.recordTitle}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {el.note}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
          {privateNote.length !== 0 && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Private Notes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {privateNote.map(el => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        // primary={el.recordTitle}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {el.note}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
        </Grid>
      )}
      <Grid item xs={12} sm={12}>
        <TextField
          multiline
          rows={5}
          maxRows={Infinity}
          fullWidth
          id="note"
          label="Adding Note"
          name="note"
          value={residentNote}
          onChange={e => setResidentNote(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button disabled={residentNote === ''} variant="contained" color="primary" type='submit' fullWidth onClick={handleAddNote}>
          Add
        </Button>
      </Grid>
    </>
  );
}
