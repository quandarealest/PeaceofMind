import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { FormControl, RadioGroup, Radio, InputLabel, Select, MenuItem } from '@mui/material';
import * as React from 'react';


export default function ResidentNotes () {
    const [btnDisabled] = useState(true)
    const [NoteTypevalue, setNoteTypeValue] = React.useState('');

  const handleChangeNoteType = (event, newValue) => {
    setNoteTypeValue(newValue);
  };
    return (
        <>     
        <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
                <InputLabel id="NoteTypelabel">Note Type</InputLabel>
                <Select
                    labelId="NoteType"
                    id="NoteType"
                    value={NoteTypevalue}
                    label="NoteType"
                    onChange={handleChangeNoteType } >
                <MenuItem value={10}>Daily Note</MenuItem>
                <MenuItem value={20}>Special Note</MenuItem>
                <MenuItem value={30}>Private Note</MenuItem>  
                </Select>
                </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={8}>
            <TextField
            multiline
            rows={5}
            maxRows={Infinity}
            fullWidth
            id="AddingNote"
            label="Adding Note"
            name="Adding Note"
            autoComplete="AddingNote"
            />
        </Grid>    
        <Grid item xs={12} sm={12}>
                <Button variant="contained" color="primary" type='submit' disabled={btnDisabled} fullWidth>
                        Save
                </Button>
        </Grid>
  </>
    );
  }
