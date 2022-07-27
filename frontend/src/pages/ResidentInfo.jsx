import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'
import { ThemeProvider, Box, CircularProgress } from '@mui/material'
import ResidentDetail from '../components/ResidentDetail/ResidentDetail'
import { theme } from '../theme/CustomizedTheme'
import { logout, reset } from '../features/auth/authSlice'
import { reset as residentReset, getResidentDetail } from '../features/resident/residentSlice'


function ResidentInfo() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedUserId = location.state.selectedUserId

  const { user } = useSelector(state => state.auth)
  const { detail, isError, isLoading, message } = useSelector(state => state.residents)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    if (!selectedUserId) {
      navigate('/resident')
    } else {
      if (isError) {
        toast.error(message)
      }
      dispatch(getResidentDetail({ userId: selectedUserId, token: user.token }))
    }
    return () => {
      dispatch(residentReset())
    }
  }, [isError, message, dispatch])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, margin: 4, height: 'calc(100vh - 90px - 32px - 32px - 20px)' }}>
        {
          isLoading ? (
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
              <CircularProgress sx={{ marginLeft: "5px" }} size={40} thickness={6} />
            </Box>
          ) : (
              Object.keys(detail).length !== 0 && (
                <ResidentDetail detail={detail} isLoading={isLoading} user={user} />
              )
            )}

      </Box>
    </ThemeProvider>
  )
}

export default ResidentInfo
