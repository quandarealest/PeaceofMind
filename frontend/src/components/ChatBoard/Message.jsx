import {
  Grid,
  ListItem,
  ListItemText,
} from '@mui/material'
import moment from 'moment'

import './Message.css'

function Message(props) {
  const { rowKey, time, message, isSendersMessage, firstName, lastName } = props
  return (
    <ListItem key={rowKey} sx={{ justifyContent: isSendersMessage ? 'flex-end' : 'flex-start' }}>
      <Grid className={`messageBox ${isSendersMessage ? 'backgroundGreen' : 'backgroundLight'}`} sx={{ width: 'fit-content' }}>
        <Grid item xs={12} justifyContent={isSendersMessage ? 'flex-end' : 'flex-start'}>
          <ListItemText
            align={isSendersMessage ? 'right' : 'left'}
            className={`messageText ${isSendersMessage ? 'colorWhite' : 'colorDark'}`}
            primary={message}
          >
          </ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            align={isSendersMessage ? 'right' : 'left'}
            secondary={`${firstName} ${lastName}  ${moment(time).format("HH:mm A")}`}
            className={`messageText ${isSendersMessage ? 'colorWhite' : 'colorDark'}`}
          ></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default Message
