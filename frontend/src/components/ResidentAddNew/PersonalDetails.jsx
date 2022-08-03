import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel'
import { FormControl, RadioGroup, Radio, InputLabel, Select, MenuItem } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { generateRandomId } from '../../common/NormalizingData'

export default function PersonalDetails(props) {
  const { handleChangeNewResidentValue, residentList, user, createdResident, createdFamily } = props
  const [btnDisabled] = useState(true)

  const handleCreateRandomResidentId = () => {
    handleChangeNewResidentValue({
      ...createdResident,
      residentNumber: generateRandomId(residentList, 'residentNumber').toString()
    }, 'resident')
  }

  return (
    <>
      <Grid item xs={12} sm={12}>
        <Typography component="h4" variant="h6">
          Personal Information:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="residentNumber"
          label="Resident ID"
          name="residentNumber"
          autoComplete="resident-id"
          value={createdResident.residentNumber}
          onChange={e => handleChangeNewResidentValue({
            ...createdResident,
            [e.target.name]: e.target.value
          }, 'resident')}
        />
        <Button onClick={handleCreateRandomResidentId}>
          Random generator
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="roomNumber"
          label="Room Number"
          name="roomNumber"
          autoComplete="roomNumber"
          value={createdResident.roomNumber}
          onChange={e => handleChangeNewResidentValue({
            ...createdResident,
            [e.target.name]: e.target.value
          }, 'resident')}
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
          value={createdResident.firstName}
          onChange={e => handleChangeNewResidentValue({
            ...createdResident,
            [e.target.name]: e.target.value
          }, 'resident')}
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
          value={createdResident.lastName}
          onChange={e => handleChangeNewResidentValue({
            ...createdResident,
            [e.target.name]: e.target.value
          }, 'resident')}
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
          value={createdResident.user.email}
          onChange={e => handleChangeNewResidentValue({
            ...createdResident,
            user: {
              ...createdResident.user,
              [e.target.name]: e.target.value
            }
          }, 'resident')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          id="contactNumber"
          label="Contact Number"
          name="contactNumber"
          autoComplete="phone"
          value={createdResident.contactNumber.toString()}
          onChange={e => handleChangeNewResidentValue({
            ...createdResident,
            [e.target.name]: parseInt(e.target.value)
          }, 'resident')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="userName"
          label="Username"
          name="userName"
          autoComplete="username"
          value={createdResident.user.userName}
          onChange={e => handleChangeNewResidentValue({
            ...createdResident,
            user: {
              ...createdResident.user,
              [e.target.name]: e.target.value
            }
          }, 'resident')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="password"
          label="Password"
          name="password"
          required
          type="password"
          value={createdResident.user.password}
          onChange={e => handleChangeNewResidentValue({
            ...createdResident,
            user: {
              ...createdResident.user,
              [e.target.name]: e.target.value
            }
          }, 'resident')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}
        >
          <DatePicker
            label="Date of Birth *"
            value={createdResident.dob}
            onChange={value => {
              handleChangeNewResidentValue({
                ...createdResident,
                dob: new Date(value).toUTCString()
              }, 'resident')
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <FormLabel required id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="gender"
            id="gender"
            value={createdResident.gender}
            onChange={e => handleChangeNewResidentValue({
              ...createdResident,
              [e.target.name]: e.target.value
            }, 'resident')}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography component="h4" variant="h6">
          Family Information:
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="First Name"
          id="firstName"
          name="firstName"
          value={createdFamily.firstName}
          onChange={e => {
            handleChangeNewResidentValue({
              ...createdFamily,
              [e.target.name]: e.target.value
            }, 'family')
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Last Name"
          id="lastName"
          name="lastName"
          value={createdFamily.lastName}
          onChange={e => {
            handleChangeNewResidentValue({
              ...createdFamily,
              [e.target.name]: e.target.value
            }, 'family')
          }}
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
          value={createdFamily.user.email}
          onChange={e => {
            handleChangeNewResidentValue({
              ...createdFamily,
              user: {
                ...createdFamily.user,
                [e.target.name]: e.target.value
              }
            }, 'family')
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Contact Number"
          autoComplete="phone"
          name="contactNumber"
          id="contactNumber"
          value={createdFamily.contactNumber.toString()}
          onChange={e => {
            handleChangeNewResidentValue({
              ...createdFamily,
              [e.target.name]: parseInt(e.target.value)
            }, 'family')
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="userName"
          label="Username"
          name="userName"
          autoComplete="username"
          value={createdFamily.user.userName}
          onChange={e => {
            handleChangeNewResidentValue({
              ...createdFamily,
              user: {
                ...createdFamily.user,
                [e.target.name]: e.target.value
              }
            }, 'family')
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          id="password"
          label="Password"
          name="password"
          type="password"
          value={createdFamily.user.password}
          onChange={e => {
            handleChangeNewResidentValue({
              ...createdFamily,
              user: {
                ...createdFamily.user,
                [e.target.name]: e.target.value
              }
            }, 'family')
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormControl fullWidth >
          <InputLabel id="EmergencyContactlabel">Emergency Contact *</InputLabel>
          <Select
            required
            labelId="EmergencyContact"
            id="emergencyContact"
            name="emergencyContact"
            label="Emergency Contact *"
            value={createdFamily.emergencyContact}
            onChange={e => handleChangeNewResidentValue({
              ...createdFamily,
              [e.target.name]: e.target.value
            }, 'family')}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>

          </Select>
        </FormControl>
      </Grid>

    </>
  );
}
