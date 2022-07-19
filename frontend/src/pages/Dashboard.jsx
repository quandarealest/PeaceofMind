import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, ThemeProvider, Typography } from '@mui/material'
import jwt_decode from 'jwt-decode'

import { theme } from '../theme/CustomizedTheme'
import AdminDashboard from '../components/AdminDashboard/AdminDashboard'
import SupervisorDashboard from '../components/SupervisorDashboard/SupervisorDashboard'
import { logout, reset } from '../features/auth/authSlice'
import ResidentFamilyDashboard from '../components/ResidentFamily/ResidentFamilyDashboard'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    const localUser = JSON.parse(localStorage.getItem('user'))
    if (localUser) {
      const token = localUser?.token
      //JWT check if token expired
      if (token) {
        const decodedToken = jwt_decode(token)
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          dispatch(logout())
          dispatch(reset())
        };
      }
    }
  }, [user, navigate])

  return (
    <ThemeProvider theme={theme}>
      {user ? (
        <>
          <Box sx={{ flexGrow: 1, margin: 4 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Hi {user.userName}, welcome back
            </Typography>
            <Typography component="h2" variant="h7" gutterBottom>
              You're viewing Grace Remus Day Care's Dashboard
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', margin: 4 }}>
            {
              user.role === 'admin' ? (
                <>
                  <AdminDashboard />
                </>
              ) : (
                  user.role === 'supervisor' ? (
                    <>
                      <SupervisorDashboard />
                    </>
                  ) : (
                      user.role === 'employee' ? (
                        <>
                          This is employee dashboard
              </>
                      ) : (
                          user.role === 'resident' ? (
                            <>
                              <ResidentFamilyDashboard/>
                </>
                          ) : (
                              <>
                                This is resident's family member dashboard
                </>
                            )
                        )
                    )
                )
            }
          </Box>
        </>
      ) : (null)}
    </ThemeProvider>
  )
}

export default Dashboard
