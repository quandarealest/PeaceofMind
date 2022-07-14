import ScrollToBottom from 'react-scroll-to-bottom'
import {
  Grid,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  Fab,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

import Message from './Message'

const conversationData = [
  {
    message: 'Hey buddy, what\'s up?',
    time: '09:30',
    key: '1',
    isSendersMessage: true
  },
  {
    message: 'Hey, I\'am good! What about you?',
    time: '09:31',
    key: '2',
    isSendersMessage: false
  },
  {
    message: 'Cool. i am good, let\'s catch up!',
    time: '10:31',
    key: '3',
    isSendersMessage: true
  }
]

function Conversation() {
  return (
    <Grid item xs={9}>
      <ScrollToBottom className="messages">
        <List>
          {conversationData.map(mess => (
            <Message key={mess.key} message={mess.message} time={mess.time} isSendersMessage={mess.isSendersMessage} />
          ))}
        </List>
      </ScrollToBottom>
      <Divider />
      <Grid container style={{ padding: '20px' }}>
        <Grid item xs={11}>
          <TextField id="outlined-basic-email" label="Type Something" fullWidth />
        </Grid>
        <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add"><SendIcon /></Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Conversation
