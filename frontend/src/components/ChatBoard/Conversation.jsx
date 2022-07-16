import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ScrollToBottom from 'react-scroll-to-bottom'
import {
  Grid,
  Divider,
  TextField,
  List,
  CircularProgress,
  Box,
  Typography,
  Fab,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

import Message from './Message'
import {
  initiateSocketConnection,
  disconnectSocket,
  socket,
  joinRoom,
  sendMessage
} from '../../socketio.service'


function Conversation(props) {
  const { isLoading, activeChat, handleUpdateChat } = props
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(activeChat.chatLog)

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    initiateSocketConnection();
    if (Object.keys(activeChat).length !== 0) {
      const { roomId, familyMemberInfo } = activeChat
      joinRoom({ roomId, senderInfo: familyMemberInfo })
      // setMessages([...messages, ...activeChat.chatLog])
    }

    return () => {
      disconnectSocket()
      setMessages([])
    }
  }, [activeChat])

  useEffect(() => {
    // to be changed to use reducer and save to db
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const handleChangeMessage = (e) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    sendMessage({
      text: message,
      roomId: activeChat.roomId,
      name: `${user.info.firstName} ${user.info.lastName}`,
      createdAt: new Date(),
      userId: user._id
    }, () => {
      setMessage('')
      handleUpdateChat(activeChat.roomId,
        {
          familyMemberId: activeChat.familyMemberId,
          roomId: activeChat.roomId,
          supervisorId: activeChat.supervisorId,
          chatLog: [...activeChat.chatLog, {
            firstName: user.info.firstName,
            lastName: user.info.lastName,
            userId: user._id,
            text: message
          }]
        })
    })
  }

  return (
    <Grid item xs={9}>
      <ScrollToBottom className="messages">
        {Object.keys(activeChat).length !== 0 ? (
          isLoading ? (
            <CircularProgress sx={{ marginLeft: "5px" }} size={40} thickness={6} />
          ) : (
              <List>
                {activeChat.chatLog.map((mess, index) => (
                  <Message
                    rowKey={index}
                    message={mess.text}
                    time={mess.createdAt}
                    firstName={mess.firstName}
                    lastName={mess.lastName}
                    isSendersMessage={user._id === mess.userId}
                  />
                ))}
              </List>
            )
        ) : (
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>
                Start a new conversation
              </Typography>
            </Box>
          )}
      </ScrollToBottom>
      <Divider />
      <Grid container style={{ padding: '20px' }}>
        <Grid item xs={11}>
          <TextField
            disabled={Object.keys(activeChat).length === 0}
            id="outlined-basic-email"
            placeholder="Send a message..."
            fullWidth
            value={message}
            onChange={handleChangeMessage} />
        </Grid>
        <Grid xs={1} align="right">
          <Fab
            disabled={Object.keys(activeChat).length === 0}
            color="primary"
            aria-label="add"
            onClick={handleSendMessage}>
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Conversation
