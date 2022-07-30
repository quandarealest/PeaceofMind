import { useState } from 'react'
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Grid, ThemeProvider } from '@mui/material'
import Typography from '@mui/material/Typography';

import { theme } from '../../theme/CustomizedTheme'
import EmergencyDialog from './EmergencyDialog'

function Footer() {
  const { user } = useSelector(state => state.auth)
  const [openEmergencyDialog, setOpenEmergencyDialog] = useState(false);

  const handleClickOpenEmergencyDialog = () => {
    setOpenEmergencyDialog(true)
  }

  const handleClickCloseEmergencyDialog = () => {
    setOpenEmergencyDialog(false)
  }

  return (
    <ThemeProvider theme={theme}>
      {user && !(user.role === 'family' || user.role === 'resident') && (
        <>
          <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
            <Toolbar>
              <Grid item xs={6} container direction="row" justifyContent="center">
                <Typography sx={{ cursor: 'pointer' }} color="inherit" component="div">
                  Notification
              </Typography>
              </Grid>
              <Grid item xs={6} container direction="row" justifyContent="center">
                <Typography sx={{ cursor: 'pointer' }} color="inherit" component="div" onClick={handleClickOpenEmergencyDialog}>
                  Report
              </Typography>
              </Grid>
            </Toolbar>
          </AppBar>
          <EmergencyDialog open={openEmergencyDialog} handleClickCloseEmergencyDialog={handleClickCloseEmergencyDialog} />
        </>
      )}
    </ThemeProvider>
  )
}

export default Footer
