import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, ThemeProvider } from '@mui/material'

import { theme } from '../theme/CustomizedTheme'
import AdminDashboard from '../components/AdminDashboard/AdminDashboard'

function Dashboard() {
  const navigate = useNavigate()

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, display: 'flex', margin: 4 }}>
        {user.role === 'admin' ? (
          <>
            <AdminDashboard />
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
          )}
      </Box>
    </ThemeProvider>
  )
}

export default Dashboard
