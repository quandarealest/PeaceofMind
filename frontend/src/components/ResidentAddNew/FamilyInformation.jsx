import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { FormControl, RadioGroup, Radio, InputLabel, Select, MenuItem } from '@mui/material';
import * as React from 'react';


export default function FamilyInformation () {
      const [btnDisabled] = useState(true)
  const [EmergencyContactvalue, setEmergencyContactvalueValue] = React.useState('');
  const handleChangeEmergencyContact = (event, newValue) => {
    setEmergencyContactvalueValue(newValue);
  };
    return (
<>
               <Grid item xs={12} sm={6}>
                <TextField
                  
                  name="ResidentFamilyfirstName"
                  required
                  fullWidth
                  id="ResidentFamilyfirstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="ResidentFamilylastName"
                  label="Last Name"
                  name="ResidentFamilylastName"
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="ResidentFamilycontactNumber"
                  label="Contact Number"
                  name="ResidentFamilycontactNumber"
                 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
               <FormControl fullWidth >
               <InputLabel id="EmergencyContactlabel">Emergency Contact</InputLabel>
                    <Select
                        labelId="EmergencyContact"
                        id="EmergencyContact"
                    value={EmergencyContactvalue}
                    label="EmergencyContact"
                    onChange={handleChangeEmergencyContact}
                >
                    <MenuItem  value={11}>Yes</MenuItem>
                    <MenuItem  value={21}>No</MenuItem>
                    
                </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                            <Button variant="contained" color="primary" type='submit' disabled={btnDisabled} fullWidth>
                              Apply
                            </Button>
              </Grid>
             
             
          </>
    );
  }
