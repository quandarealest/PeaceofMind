import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme/CustomizedTheme'
import { FormControl, RadioGroup, Radio, InputLabel, Select, MenuItem } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
export default function ResidentAddNew() {
  
  const [value, setValue] = React.useState(null);const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Register New Resident
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="residentId"
                  label="Resident ID"
                  name="residentId"
                  autoComplete="resident-id"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="roomNo"
                  label="Room No"
                  name="roomNo"
                  autoComplete="roomNo"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
              <Typography component="h4" variant="h6">
            Personal Information:
          </Typography>
             
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="contactNumber"
                  label="Contact Number"
                  name="contactNumber"
                  autoComplete="phone"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}
                >
                <DatePicker
             
                    label="Date of Birth"
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params}   fullWidth />}
                />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
              <Typography component="h4" variant="h6">
              Medical Information:
          </Typography>
             
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="BloodGroup"
                  label="Blood Group"
                  name="BloodGroup"
                  autoComplete="BloodGroup"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  
                  fullWidth
                  id="Weight"
                  label="Weight"
                  name="Weight"
                  autoComplete="Weight"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                
                  fullWidth
                  id="Height"
                  label="Height"
                  name="Height"
                  autoComplete="Height"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                 multiline
                 rows={4}
                 maxRows={Infinity}
                  required
                  fullWidth
                    
                
                  id="Medication"
                  label="Medication"
                  name="Medication"
                  autoComplete="Medication"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                
                 multiline
                 rows={4}
                 maxRows={Infinity}
                  fullWidth
                  id="Allergies"
                  label="Allergies"
                  name="Allergies"
                  autoComplete="Allergies"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                    
                 multiline
                 rows={4}
                 maxRows={Infinity}
                  fullWidth
                  id="Diet"
                  label="Diet"
                  name="Diet"
                  autoComplete="Diet"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
            </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancel
            </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}