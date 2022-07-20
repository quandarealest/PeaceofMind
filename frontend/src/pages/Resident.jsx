import { ThemeProvider, Box } from '@mui/material'
import { theme } from '../theme/CustomizedTheme'
import ResidentInfo from '../components/ResidentInfo/ResidentInfo'
  
const Resident = () => {
  
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, margin: 4, height: 'calc(100vh - 90px - 32px - 32px)' }}>
          <ResidentInfo />
        </Box>
      </ThemeProvider>
    );
}
  
export default Resident;