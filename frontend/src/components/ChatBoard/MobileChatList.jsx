import {
  Grid,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material'
import moment from 'moment'

import './ChatList.css'


const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function MobileChatList(props) {

  const { isLoading, chatList, activeChat, handleActiveChat, user } = props

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
            <Avatar {...stringAvatar(`${familyMemberInfo.firstName} ${familyMemberInfo.lastName}`)} />
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
            <Avatar {...stringAvatar(`${supervisorInfo.firstName} ${supervisorInfo.lastName}`)} />
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
      <Grid item sx={{ borderRight: '1px solid #e0e0e0', display: { xs: 'block', md: 'block', lg: 'none' } }}>
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
              <Grid item xs={12} style={{ padding: '10px' }}>
                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
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
                              <Avatar {...stringAvatar(`${familyMemberInfo.firstName} ${familyMemberInfo.lastName}`)} />
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
                              <Avatar {...stringAvatar(`${supervisorInfo.firstName} ${supervisorInfo.lastName}`)} />
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
                  <Typography>
                    No current chat, start a new chat now!
                  </Typography>
                )}
            </>
          )}
      </Grid>
    </>
  )
}

export default MobileChatList
