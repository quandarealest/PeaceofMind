import React from 'react'
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Grid, ThemeProvider } from '@mui/material'
import Typography from '@mui/material/Typography';

import { theme } from '../../theme/CustomizedTheme'


function Footer() {
  const { user } = useSelector(state => state.auth)

  return (
    <ThemeProvider theme={theme}>
      {user && (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
          <Toolbar>
            <Grid item xs={6} container direction="row" justifyContent="center">
              <Typography color="inherit" component="div">
                Notification
              </Typography>
            </Grid>
            <Grid item xs={6} container direction="row" justifyContent="center">
              <Typography color="inherit" component="div">
                Report
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
      )}
    </ThemeProvider>
  )
}

export default Footer
