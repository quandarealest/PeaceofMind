import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, ThemeProvider, Typography } from '@mui/material'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'

import { theme } from '../theme/CustomizedTheme'
import AdminDashboard from '../components/AdminDashboard/AdminDashboard'
import SupervisorDashboard from '../components/SupervisorDashboard/SupervisorDashboard'
import CaregiverDashboard from '../components/CaregiverDashboard/CaregiverDashboard'
import ResidentFamilyDashboard from '../components/ResidentFamilyDashboard/ResidentFamilyDashboard'
import { logout, reset } from '../features/auth/authSlice'
import { reset as timelineReset, getResidentTimeline } from '../features/timeline/timelineSlice'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { feed, isLoading, isError, message } = useSelector(state => state.feed)

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
    if (user && user.role === 'family') {
      if (isError) {
        toast.error(message)
      } else {
        const { info } = user
        dispatch(getResidentTimeline(info.residentId))
      }
    }

  }, [user, navigate, isError, message])

  const getGreeting = () => {
    const myDate = new Date()
    const hrs = myDate.getHours()

    if (hrs < 12) {
      return 'Good morning 🌕'
    } else if (hrs >= 12 && hrs <= 17) {
      return 'Good afternoon 🌓'
    } else {
      return 'Good evening 🌑'
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {user ? (
        <>
          {user.role === 'admin' ? (
            <Box sx={{ flexGrow: 1, margin: 4 }}>
              <Typography component="h2" variant="h6" gutterBottom>
                {getGreeting()}, admin
              </Typography>
              <Typography component="h2" variant="h7" gutterBottom>
                You're viewing Grace Remus Day Care's Dashboard
            </Typography>
            </Box>
          ) : (
              <Box sx={{ flexGrow: 1, margin: 4 }}>
                <Typography component="h2" variant="h6" gutterBottom>
                  {getGreeting()}, {`${user.info.firstName} ${user.info.lastName}`}
                </Typography>
                <Typography component="h2" variant="h7" gutterBottom>
                  You're viewing Grace Remus Day Care's Dashboard
            </Typography>
              </Box>
            )}
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
                          <CaregiverDashboard />
                        </>
                      ) : (
                          <>
                            <ResidentFamilyDashboard timeline={feed} user={user} isLoading={isLoading} />
                          </>
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
