import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
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
import PersonalDetails from './PersonalDetails';
import FamilyInformation from './FamilyInformation';
import MedicalInformation from './MedicalInformation';
import ResidentNotes from './ResidentNotes';
import { useDispatch, useSelector } from 'react-redux'

const steps = ['Personal Details', 'Family Information', 'Medical Information','Resident Notes'];


export default function ResidentAddingNew() {
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const optionalSet=new Set([2,3]);
 

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
          <PersonalDetails/>
        );
      case 1:
        return (
          <FamilyInformation/>
        );
        case 2:
        return (
         <MedicalInformation/>
        );
        case 3:
            return (
             <ResidentNotes/>
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