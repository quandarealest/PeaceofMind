import * as React from 'react';
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
  Divider
} from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';

import { NoteType } from './ResidentEnum'
import { normalizeDate } from '../../common/NormalizingData'

const style1 = {
  marginBottom: 2,
};

const style2 = {
  marginTop: 1,
};

function Note(props) {
  const { noteRecord, user } = props

  const [noteOption, setNoteOption] = React.useState(NoteType[0].value);
  const [newNoteValue, setNewNoteValue] = React.useState('');

  const handleChangeOption = (event) => {
    setNoteOption(event.target.value);
  };

  const handleAddNewNote = (e) => {
    e.preventDefault()
    console.log(noteOption, newNoteValue.trim())
  }

  return (
    <>
      <Box sx={{ justifyContent: 'center' }}>
        <Grid xs={11} container spacing={0.5} sx={style1}>
          <Grid item xs={12} md={2}>
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
          </Grid>
          <Grid item xs={12} md={4}>
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
        {Object.keys(noteRecord).length !== 0 ? (
          <>
            {noteRecord.notes.map(note => {
              const { noteType, records } = note
              return (
                <Accordion>
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
                                <Typography variant="body1" color="text.secondary">
                                  {note}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false} size="small">Update</Button>
                                <Button disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false} size="small">Remove</Button>
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
                                  <Typography variant="body1" color="text.secondary">
                                    {note}
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  <Button disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false} size="small">Update</Button>
                                  <Button disabled={user._id !== createdId ? (user.role === 'supervisor' ? false : true) : false} size="small">Remove</Button>
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

      </Box>
    </>
  )

}

export default Note
