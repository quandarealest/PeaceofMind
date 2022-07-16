import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
import {
  ThemeProvider,
  Box
} from '@mui/material'

import { theme } from '../theme/CustomizedTheme'
import ChatBoard from '../components/ChatBoard/ChatBoard'
import { logout, reset } from '../features/auth/authSlice'


const Chat = () => {
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
        <Box sx={{ flexGrow: 1, margin: 4, height: 'calc(100vh - 90px - 32px - 32px)' }}>
          <ChatBoard />
        </Box>
      ) : (null)}
    </ThemeProvider>
  );
}

export default Chat;