import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { createEmployee, reset } from '../../features/employee/employeeSlice'
import { toast } from 'react-toastify'
import { theme } from '../../theme/CustomizedTheme'
import { FormControl, RadioGroup, Radio, InputLabel, Select, MenuItem } from '@mui/material';
import { selectEmployeeOptions } from './AddNewEnum'


export default function EmployeeAddNew(props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData, employeeData } = props
  const { user, employees, isSuccess, isError, isLoading: employeeLoading, message } = useSelector(state => state.auth)

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [option, setOption] = useState(selectEmployeeOptions[0].value)

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  //newNoteValue.trim()

  const [btnDisabled, setBtnDisabled] = useState(true)

  const handleChangeRoleOption = (e) => {
    setOption(selectEmployeeOptions.find(opt => opt.value === e.target.value))
    setBtnDisabled(false);
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || employees) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, employees, isError, isSuccess, message, navigate, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      userName: userName.trim(),
      password: password.trim(),
      email: email.trim(),
      role: option.value,
    }
    const employeeData = {   
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      contactNumber: contactNumber.trim(),
      employeeNumber: employeeNumber.trim(),
    }

    dispatch(createEmployee({user: userData, employee: employeeData, token: user.token}))
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("../", { replace: true });
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
            Register New Employee
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
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
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                  value={contactNumber}
                  onChange={e => setContactNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="employeeNumber"
                  label="Employee ID"
                  name="employeeNumber"
                  autoComplete="employee-id"
                  value={employeeNumber}
                  onChange={e => setEmployeeNumber(e.target.value)}
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
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="rePassword"
                  label="Re-enter Password"
                  type="password"
                  id="rePassword"
                  autoComplete="re-password"
                  value={rePassword}
                  onChange={e => setRePassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel id="gender" name="gender">Gender</FormLabel>
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
              <Grid item xs={12} sm={6}>
                <FormControl size="large" fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={option.value}
                    label={option.title}
                    onChange={handleChangeRoleOption}
                  >
                    {selectEmployeeOptions.map(opt => {
                      return <MenuItem value={opt.value}>{opt.title}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={btnDisabled}
                  onClick={(e) => handleSubmit(e)}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
            </Button>
              </Grid>
              <Grid item xs={12} sm={6} >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={(e) => handleCancel(e)}
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