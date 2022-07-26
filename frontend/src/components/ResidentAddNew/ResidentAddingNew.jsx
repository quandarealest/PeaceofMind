import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme/CustomizedTheme'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { FormControl, RadioGroup, Radio, InputLabel, Select, MenuItem } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import Note from '../ResidentDetail/Note';
import { width } from '@mui/system';
const steps = ['Personal Details', 'Family Information', 'Medical Information','Resident Notes'];


export default function ResidentAddingNew() {
  const [btnDisabled] = useState(true)
  const [EmergencyContactvalue, setEmergencyContactvalueValue] = React.useState('');
  const [value, setValue] = React.useState(null);
  const handleChangeEmergencyContact = (event, newValue) => {
    setEmergencyContactvalueValue(newValue);
  };
  const [NoteTypevalue, setNoteTypeValue] = React.useState('');

  const handleChangeNoteType = (event, newValue) => {
    setNoteTypeValue(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const style1 = {
    marginBottom: 2,
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const optionalSet=new Set([2,3]);
  const isStepOptional = (step) => {
    return optionalSet.has(step);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  // Get content based on which step is active
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
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
                    renderInput={(params) => <TextField {...params} fullWidth />}
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
          </>
        );
      case 1:
        return (
          <>
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
                  id="contactNumber"
                  label="Contact Number"
                  name="contactNumber"
                  autoComplete="phone"
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
        case 2:
        return (
          <>
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
             
          </>
        );
        case 3:
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
      default:
        return 'Unknown step';
    }
  }

  const handleReset = () => {
    setActiveStep(0);
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
             <Typography component="h1" variant="h5">
            Register New Resident
          </Typography>
         
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
         
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4, width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Grid container spacing={2} sx={{pt: 4, maxwidhth:'100%'}}>
             <Grid item xs={12} sm={12}>
                        <Typography sx={{ mt: 2, mb: 1 }} fullWidth>
                        All steps completed - you&apos;re finished
                    </Typography>
             </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
          <Grid container spacing={2} sx={{pt: 4 }}>
          <Grid item xs={12} sm={4} md={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
            </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
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
        
        </React.Fragment>
      ) : (
        <React.Fragment>
           <Grid container spacing={2} sx={{pt: 4, maxwidhth:'100%'}}>
             {getStepContent(activeStep)}
           </Grid>

          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}  
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}