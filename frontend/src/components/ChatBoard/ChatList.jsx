import {
  Grid,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Box,
  Typography,
  Button
} from '@mui/material'
import moment from 'moment'
import PoMAvatar from '../PoMAvatar/PoMAvatar'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import './ChatList.css'

function ChatList(props) {

  const { isLoading, chatList, activeChat, handleActiveChat, user, newChat } = props

  const renderActiveChatComponent = () => {
    const { familyMemberInfo, roomId, updatedAt, supervisorInfo } = activeChat;
    if (user.role === 'supervisor') {
      return (
        <ListItem
          button
          key={roomId}
          onClick={() => handleActiveChat(roomId)}
          className={roomId === activeChat.roomId ? 'activeChat' : ''}
        >
          <ListItemIcon>
            <PoMAvatar firstName={familyMemberInfo.firstName} lastName={familyMemberInfo.lastName} />
          </ListItemIcon>
          <ListItemText primary={`${familyMemberInfo.firstName} ${familyMemberInfo.lastName}`}>
            {`${familyMemberInfo.firstName} ${familyMemberInfo.lastName}`}
          </ListItemText>
          <ListItemText secondary={moment(updatedAt).format("DD MMM HH:mm A")} align="right"></ListItemText>
        </ListItem>
      )
    } else {
      return (
        <ListItem
          button
          key={roomId}
          onClick={() => handleActiveChat(roomId)}
          className={roomId === activeChat.roomId ? 'activeChat' : ''}
        >
          <ListItemIcon>
            <PoMAvatar firstName={supervisorInfo.firstName} lastName={supervisorInfo.lastName} />
          </ListItemIcon>
          <ListItemText primary={`${supervisorInfo.firstName} ${supervisorInfo.lastName}`}>
            {`${supervisorInfo.firstName} ${supervisorInfo.lastName}`}
          </ListItemText>
          <ListItemText secondary={moment(updatedAt).format("DD MMM HH:mm A")} align="right"></ListItemText>
        </ListItem>
      )
    }
  }
  return (
    <>
      <Grid item lg={3} sx={{ borderRight: '1px solid #e0e0e0', display: { xs: 'none', md: 'none', lg: 'block' } }}>
        {isLoading ? (
          <>
            <Box sx={{ backgroundColor: '#f3f3f3', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress sx={{ marginLeft: "5px" }} size={40} thickness={6} />
            </Box>
          </>
        ) : (
            <>
              {
                Object.keys(activeChat).length !== 0 ?
                  (
                    renderActiveChatComponent()
                  ) : (null)
              }
              <Divider />
              <Grid container xs={12} sx={{ padding: '5px' }}>
                <Grid item xs={7} sx={{ padding: '5px' }}>
                  <TextField size="small" id="outlined-basic-email" label="Search" variant="outlined" />
                </Grid>
                <Grid item xs={5} sx={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
                  <Button onClick={e => {
                    e.preventDefault()
                    newChat()
                  }} size="small" variant="contained" endIcon={<QuestionAnswerIcon />}>
                    New Chat
                  </Button>
                </Grid>
              </Grid>
              <Divider />
              {chatList.length !== 0 ? (
                <List>
                  {[...chatList]
                    .sort((left, right) => moment.utc(right.updatedAt).diff(moment.utc(left.updatedAt)))
                    .map(chat => {
                      const { familyMemberInfo, supervisorInfo, roomId, updatedAt } = chat;

                      if (user.role === 'supervisor') {
                        return (
                          <ListItem
                            button
                            key={roomId}
                            onClick={() => handleActiveChat(roomId)}
                            className={roomId === activeChat.roomId ? 'activeChat' : ''}
                          >
                            <ListItemIcon>
                              <PoMAvatar firstName={familyMemberInfo.firstName} lastName={familyMemberInfo.lastName} />

                            </ListItemIcon>
                            <ListItemText primary={`${familyMemberInfo.firstName} ${familyMemberInfo.lastName}`}>
                              {`${familyMemberInfo.firstName} ${familyMemberInfo.lastName}`}
                            </ListItemText>
                            <ListItemText secondary={moment(updatedAt).format("DD MMM HH:mm A")} align="right"></ListItemText>
                          </ListItem>
                        )
                      } else {
                        return (
                          <ListItem
                            button
                            key={roomId}
                            onClick={() => handleActiveChat(roomId)}
                            className={roomId === activeChat.roomId ? 'activeChat' : ''}
                          >
                            <ListItemIcon>
                              <PoMAvatar firstName={supervisorInfo.firstName} lastName={supervisorInfo.lastName} />
                            </ListItemIcon>
                            <ListItemText primary={`${supervisorInfo.firstName} ${supervisorInfo.lastName}`}>
                              {`${supervisorInfo.firstName} ${supervisorInfo.lastName}`}
                            </ListItemText>
                            <ListItemText secondary={moment(updatedAt).format("DD MMM HH:mm A")} align="right"></ListItemText>
                          </ListItem>
                        )
                      }
                    })}
                </List>
              ) : (
                  <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>
                      No current chat, start a new one now!
                    </Typography>
                  </Box>
                )}
            </>
          )}
      </Grid>
    </>
  )
}

export default ChatList
