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
  IconButton,
  Drawer
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';

import './Message.css'

import Message from './Message'
import {
  initiateSocketConnection,
  disconnectSocket,
  socket,
  joinRoom,
  sendMessage
} from '../../socketio.service'


function Conversation(props) {
  const drawerWidth = 300;
  const { isLoading, activeChat, handleUpdateChat, mobileChatListComponent } = props
  const [drawerAnchorEl, setDrawerAnchorEl] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(activeChat.chatLog)
  const isDrawerOpen = Boolean(drawerAnchorEl)

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
    socket.on('message', (message) => {
      const onSaveDB = true
      setMessages([...messages, message])
      handleUpdateChat(activeChat.roomId,
        {
          familyMemberId: activeChat.familyMemberId,
          roomId: activeChat.roomId,
          supervisorId: activeChat.supervisorId,
          chatLog: [...activeChat.chatLog, {
            firstName: message.name.split(' ')[0],
            lastName: message.name.split(' ')[1],
            userId: message.userId,
            text: message.text
          }]
        },
        onSaveDB)
    })
  }, [messages])

  const handleDrawerMenuClose = () => {
    setDrawerAnchorEl(null)
  }

  const handleDrawerMenuOpen = (event) => {
    setDrawerAnchorEl(event.currentTarget)
  }

  const handleChangeMessage = (e) => {
    setMessage(e.target.value)
  }

  const handleSideBar = (childComponent) => {
    return (
      <>
        <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
          {isDrawerOpen ? (
            <div class="overlay" onClick={handleDrawerMenuClose}>
            </div>
          ) : (null)}
          <Drawer
            sx={{
              zIndex: 99,
              position: 'relative',
              '& .MuiBackdrop-root': {
                display: 'none',
              },
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                position: 'absolute',
                height: 'calc(100vh - 90px - 32px - 32px)',
              },
              display: { xs: 'flex', md: 'flex', lg: 'none' }
            }}
            variant="persistent"
            anchor="left"
            id={drawerMenuId}
            open={isDrawerOpen}
            onClose={handleDrawerMenuClose}
          >
            {childComponent ? (
              childComponent
            ) : (null)}
          </Drawer>
        </Box>
      </>
    )
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    const onSaveDB = false
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
        },
        onSaveDB)
    })
  }

  const drawerMenuId = 'primary-drawer-menu';

  return (
    <Grid item lg={9} md={12} xs={12}>
      {handleSideBar(mobileChatListComponent)}
      <Box sx={{ display: { xs: 'block', md: 'block', lg: 'none' }, paddingLeft: '20px' }}
      >
        <>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='drawer'
            onClick={handleDrawerMenuOpen}
            aria-controls={drawerMenuId}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </>
      </Box>
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
