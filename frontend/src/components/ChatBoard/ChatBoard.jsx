import {
  Paper,
  Grid,
} from '@mui/material'

import './ChatBoard.css'

import ChatList from './ChatList'
import Conversation from './Conversation'

function ChatBoard() {
  return (
    <Grid container component={Paper} sx={{ width: '100%', height: '100%' }}>
      <ChatList />
      <Conversation />
    </Grid>
  )
}

export default ChatBoard
