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
import {register} from '../../features/auth/authSlice';
import {CreateResident} from '../../features/resident/residentSlice';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography';
export default function PersonalDetails() {
    
    const dispatch = useDispatch()
    const [residentID, setresidentID] = useState('');
    const [residentRoomNo, setresidentRoomNo] = useState('');
    const [residentFirstName, setresidentFirstName] = useState('');
    const [residentLastName, setresidentLastName] = useState('');
    const [residentEmail, setresidentEmail] = useState('');
    const [residentUsername, setresidentUsername] = useState('');
    const [residentContactNo, setresidentContactNo] = useState('');
    const [residentDOB, setresidentDOB] = useState(null);
    const [residentGender, setresidentGender] = useState('');
    const [residentPassword,   setresidentPassword] = useState('');
    const {user,isSuccess, isError, message } = useSelector(state => state.auth)
//Resident Family
    const [ResidentFamilyfirstName, setResidentFamilyfirstName] = useState('');
    const [ResidentFamilylastName, setResidentFamilylastName] = useState('');
    const [ResidentFamilycontactNumber, setResidentFamilycontactNumber] = useState('');
    const [residentFamilyemail, setresidentFamilyemail] = useState('');
    const [residentFamilyUsername, setresidentFamilyUsername] = useState('');
    const [residentFamilyPassword, setresidentFamilyPassword] = useState('');
    const [btnDisabled] = useState(true)
    const [EmergencyContact, setEmergencyContact] = useState('');
  
    useEffect(() => {
        if (isError) {
          toast.error(message)
        } 
      }, [user, isError, isSuccess, message])
    const handleAddNewUser = (e) => {
        e.preventDefault()
        const newUserResident = {
          userName: residentUsername.trim(),
          password: residentPassword.trim(),
          email: residentEmail.trim(),
          role: "resident",
        }
        //console.log(newUserResident);

        //dispatch(register(newUserResident));

        const newResident = {
            firstName:residentFirstName.trim(),
            lastName:residentLastName.trim(),
            contactNumber:parseInt(residentContactNo.trim(), 10),
            residentNumber:residentID,
            roomNumber:residentRoomNo.trim(),
            gender:residentGender.trim(),
            dob:residentDOB,
            supervisorEmployeeId:user.info.userId,

        }
       // console.log(newResident);
        const newUserFamily = {
            userName: residentFamilyUsername.trim(),
            password: residentFamilyPassword.trim(),
            email: residentFamilyemail.trim(),
            role: "family",
        }
        const newResidentFamily = {
            firstName:ResidentFamilyfirstName.trim(),
            lastName:ResidentFamilylastName.trim(),
            contactNumber:parseInt(ResidentFamilycontactNumber.trim(), 10),
            emergencyContact:EmergencyContact
            
        }
        //console.log(user.info.userId);
        dispatch(CreateResident({newUserResident,newResident, newUserFamily,newResidentFamily, token: user.token}))
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
                                id="residentId"
                                label="Resident ID"
                                name="residentId"
                                autoComplete="resident-id"
                                value={residentID}
                                onChange={e => setresidentID(e.target.value)}
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
                                value={residentRoomNo}
                                onChange={e => setresidentRoomNo(e.target.value)}
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
                                value={residentFirstName}
                                onChange={e => setresidentFirstName(e.target.value)}
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
                                value={residentLastName}
                                onChange={e => setresidentLastName(e.target.value)}
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
                                value={residentEmail}
                                onChange={e => setresidentEmail(e.target.value)}
                            />
                        
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                            <TextField
                                
                                fullWidth
                                id="contactNumber"
                                label="Contact Number"
                                name="contactNumber"
                                autoComplete="phone"
                                value={residentContactNo}
                                onChange={e => setresidentContactNo(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                   
                   <TextField
                       required
                       fullWidth
                       id="Username"
                       label="User name"
                       name="Username"
                       autoComplete="User name"
                       value={residentUsername}
                       onChange={e => setresidentUsername(e.target.value)}
                   />
                 
                   </Grid>
                   <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="Password"
                                label="Password"
                                name="Password"
                                autoComplete="Password"
                                type="password"
                                value={residentPassword}
                                onChange={e => setresidentPassword(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}
                            >
                                <DatePicker
                                label="Date of Birth"
                                value={residentDOB}
                                onChange={(newValue) => {
                                    setresidentDOB(newValue);
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
                                value={residentGender}
                                onChange={e => setresidentGender(e.target.value)}
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
                        
                        name="ResidentFamilyfirstName"
                        required
                        fullWidth
                        id="ResidentFamilyfirstName"
                        label="Family First Name"
                        autoFocus
                        value={ResidentFamilyfirstName}
                                        onChange={e => setResidentFamilyfirstName(e.target.value)}
                        />
                    </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="ResidentFamilylastName"
                  label="Family Last Name"
                  name="ResidentFamilylastName"
                  value={ResidentFamilylastName}
                  onChange={e => setResidentFamilylastName(e.target.value)}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                       
                            <TextField
                                required
                                fullWidth
                                id="Familyemail"
                                label="Family Email Address"
                                name="Familyemail"
                                autoComplete="Familyemail"
                                value={residentFamilyemail}
                                onChange={e => setresidentFamilyemail(e.target.value)}
                            />
                        
                    </Grid>
                    
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="ResidentFamilycontactNumber"
                  label="Contact Number"
                  name="ResidentFamilycontactNumber"
                  value={ResidentFamilycontactNumber}
                  onChange={e => setResidentFamilycontactNumber(e.target.value)}
                 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                   
                   <TextField
                       required
                       fullWidth
                       id="FamilyUsername"
                       label="Family User name"
                       name="FamilyUsername"
                       autoComplete="FamilyUsername"
                       value={residentFamilyUsername}
                       onChange={e => setresidentFamilyUsername(e.target.value)}
                   />
                 
                   </Grid>
                   <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="FamilyPassword"
                                label="FamilyPassword"
                                name="FamilyPassword"
                                autoComplete="FamilyPassword"
                                type="password"
                                value={residentFamilyPassword}
                                onChange={e => setresidentFamilyPassword(e.target.value)}
                            />
                    </Grid>
              <Grid item xs={12} sm={12}>
               <FormControl fullWidth >
               <InputLabel id="EmergencyContactlabel">Emergency Contact</InputLabel>
                    <Select
                        labelId="EmergencyContact"
                        id="EmergencyContact"
                    label="EmergencyContact"
                    value={EmergencyContact}
                    onChange={e => setEmergencyContact(e.target.value)}
                >
                    <MenuItem  value={true}>Yes</MenuItem>
                    <MenuItem  value={false}>No</MenuItem>
                    
                </Select>
                </FormControl>
              </Grid>
            
                    <Grid item xs={12} md={12}>
                            <Button variant="contained" color="primary" type='submit' fullWidth  onClick={handleAddNewUser}>
                                Apply
                            </Button>
                    </Grid>
                </>
    );
  }
