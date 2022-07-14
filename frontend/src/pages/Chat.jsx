import {
  ThemeProvider,
  Box
} from '@mui/material'

import { theme } from '../theme/CustomizedTheme'
import ChatBoard from '../components/ChatBoard/ChatBoard'


const Chat = () => {

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, margin: 4, height: 'calc(100vh - 90px - 32px - 32px)' }}>
        <ChatBoard />
      </Box>
    </ThemeProvider>
  );
}

export default Chat;