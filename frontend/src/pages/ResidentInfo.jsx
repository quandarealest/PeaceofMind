import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { ThemeProvider, Box, CircularProgress } from '@mui/material'
import ResidentDetail from '../components/ResidentDetail/ResidentDetail'
import { theme } from '../theme/CustomizedTheme'
import { reset as residentReset, getResidentDetail } from '../features/resident/residentSlice'
import { reset as timelineReset, getResidentTimeline } from '../features/timeline/timelineSlice'
import jwt_decode from 'jwt-decode'
import { logout , reset } from '../features/auth/authSlice'

function ResidentInfo() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedUserId = location.state.selectedUserId

  const { user } = useSelector(state => state.auth)
  const { detail, isError, isLoading, message } = useSelector(state => state.residents)
  const { feed } = useSelector(state => state.feed)
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
    if (!selectedUserId) {
      navigate('/resident')
    } else {
      if (isError) {
        toast.error(message)
      }
      dispatch(getResidentDetail({ userId: selectedUserId, token: user.token }))
      dispatch(getResidentTimeline(selectedUserId))
    }
    return () => {
      dispatch(residentReset())
      dispatch(timelineReset())
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
                <ResidentDetail detail={detail} isLoading={isLoading} user={user} feed={feed} />
              )
            )}

      </Box>
    </ThemeProvider>
  )
}

export default ResidentInfo
