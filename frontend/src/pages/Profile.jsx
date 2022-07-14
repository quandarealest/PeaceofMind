import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, ThemeProvider} from '@mui/material'
import jwt_decode from 'jwt-decode'
import { theme } from '../theme/CustomizedTheme'
import { logout, reset } from '../features/auth/authSlice'
import SupervisorProfile from '../components/SupervisorProfile/SupervisorProfile'

function Profile() {
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
            <Box sx={{ flexGrow: 1, display: 'flex', margin: 4 }}>
              {
                user.role === 'resident' ? (
                  <>
                   This is resident's family member profile
                  </>
                ) : (
                    <SupervisorProfile/>   
                  )
              }
            </Box>
          </>
        ) : (null)}
      </ThemeProvider>
    )
}

export default Profile
