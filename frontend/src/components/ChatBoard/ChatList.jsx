import {
  Grid,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

function ChatList() {
  return (
    <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
      <List>
        <ListItem button key="RemySharp">
          <ListItemIcon>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          </ListItemIcon>
          <ListItemText primary="John Wick"></ListItemText>
        </ListItem>
      </List>
      <Divider />
      <Grid item xs={12} style={{ padding: '10px' }}>
        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
      </Grid>
      <Divider />
      <List>
        <ListItem button key="RemySharp">
          <ListItemIcon>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          </ListItemIcon>
          <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
          <ListItemText secondary="online" align="right"></ListItemText>
        </ListItem>
        <ListItem button key="Alice">
          <ListItemIcon>
            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
          </ListItemIcon>
          <ListItemText primary="Alice">Alice</ListItemText>
        </ListItem>
        <ListItem button key="CindyBaker">
          <ListItemIcon>
            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
          </ListItemIcon>
          <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
        </ListItem>
      </List>
    </Grid>
  )
}

export default ChatList
