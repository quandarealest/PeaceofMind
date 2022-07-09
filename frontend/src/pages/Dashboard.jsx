import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, ThemeProvider } from '@mui/material'
import jwt_decode from 'jwt-decode'

import { theme } from '../theme/CustomizedTheme'
import AdminDashboard from '../components/AdminDashboard/AdminDashboard'
import { logout, reset } from '../features/auth/authSlice'

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
      <Box sx={{ flexGrow: 1, display: 'flex', margin: 4 }}>
        {user ? (
          <>
            {
              user.role === 'admin' ? (
                <>
                  <AdminDashboard user={user} />
                </>
              ) : (
                  user.role === 'supervisor' ? (
                    <>
                      This is supervisor dashboard
            </>
                  ) : (
                      user.role === 'employee' ? (
                        <>
                          This is employee dashboard
              </>
                      ) : (
                          user.role === 'resident' ? (
                            <>
                              Hello resident
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
          </>
        ) : (null)}
      </Box>
    </ThemeProvider>
  )
}

export default Dashboard
