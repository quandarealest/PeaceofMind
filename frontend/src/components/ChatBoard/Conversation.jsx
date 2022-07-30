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
import InfoIcon from '@mui/icons-material/Info';

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
  const { isLoading, activeChat, handleUpdateChat, mobileChatListComponent, mobileChatterInfoComponent } = props
  const [drawerChatListAnchorEl, setDrawerChatListAnchorEl] = useState(null)
  const [drawerChatterInfoAnchorEl, setDrawerChatterInfoAnchorEl] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(activeChat.chatLog)
  const isDrawerChatListOpen = Boolean(drawerChatListAnchorEl)
  const isDrawerChatterInfoOpen = Boolean(drawerChatterInfoAnchorEl)

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

  const handleDrawerChatListClose = () => {
    setDrawerChatListAnchorEl(null)
  }

  const handleDrawerChatListOpen = (event) => {
    setDrawerChatListAnchorEl(event.currentTarget)
  }

  const handleDrawerChatterInfoClose = () => {
    setDrawerChatterInfoAnchorEl(null)
  }

  const handleDrawerChatterInfoOpen = (event) => {
    setDrawerChatterInfoAnchorEl(event.currentTarget)
  }

  const handleChangeMessage = (e) => {
    setMessage(e.target.value)
  }

  const handleSideBarChatList = (childComponent) => {
    return (
      <>
        <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
          {isDrawerChatListOpen ? (
            <div class="overlay" onClick={handleDrawerChatListClose}>
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
            id={drawerChatListId}
            open={isDrawerChatListOpen}
            onClose={handleDrawerChatListClose}
          >
            {childComponent ? (
              childComponent
            ) : (null)}
          </Drawer>
        </Box>
      </>
    )
  }

  const handleSideBarChatterInfo = (childComponent) => {
    return (
      <>
        <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
          {isDrawerChatterInfoOpen ? (
            <div class="overlay" onClick={handleDrawerChatterInfoClose}>
            </div>
          ) : (null)}
          <Drawer
            sx={{
              zIndex: 99,
              '& .MuiBackdrop-root': {
                // display: 'none',
              },
              '& .MuiDrawer-paper': {
                width: isDrawerChatterInfoOpen ? drawerWidth : 0,
                position: 'absolute',
                height: 'calc(100vh - 90px - 32px - 32px)',
              },
              display: { xs: 'flex', md: 'flex', lg: 'none' }
            }}
            variant="persistent"
            anchor="right"
            id={drawerChatterInfoId}
            open={true}
            onClose={handleDrawerChatterInfoClose}
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

  const drawerChatListId = 'primary-drawer-menu';
  const drawerChatterInfoId = 'secondary-drawer-menu';

  return (
    <Grid item lg={6} md={12} xs={12} sx={{ position: 'relative' }}>
      {handleSideBarChatList(mobileChatListComponent)}
      {handleSideBarChatterInfo(mobileChatterInfoComponent)}
      <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'none' }, padding: '0 10px', justifyContent: 'space-between' }}
      >
        <>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='drawer'
            onClick={handleDrawerChatListOpen}
            aria-controls={drawerChatListId}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            size='large'
            edge='end'
            color='inherit'
            aria-label='drawer'
            onClick={handleDrawerChatterInfoOpen}
            aria-controls={drawerChatterInfoId}
          >
            <InfoIcon />
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
                Start a new conversation 💬
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
            sx={{ zIndex: 1 }}
            onClick={handleSendMessage}>
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Conversation
