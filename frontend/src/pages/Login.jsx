import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Typography, Container, CircularProgress, Box, TextField, CssBaseline, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../theme/CustomizedTheme'
import { login, reset } from '../features/auth/authSlice'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isLoading, isSuccess, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);

    const userData = {
      email: data.get('email'),
      password: data.get('password')
    }

    dispatch(login(userData))
  }

  // if (isLoading) {
  //   return (
  //     <Box sx={{ display: 'flex' }}>
  //       <CircularProgress />
  //     </Box>
  //   )
  // }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <img src="/images/lotus.png" alt="lotus" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
              {isLoading ? (<>
                <CircularProgress sx={{ color: "white", marginLeft: "5px" }} size={14} thickness={6} />
              </>) : (<></>)}
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login
