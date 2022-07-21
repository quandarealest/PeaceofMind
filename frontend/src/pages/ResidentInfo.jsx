import React from 'react'
import { ThemeProvider, Box } from '@mui/material'
import ResidentDetail from '../components/ResidentDetail/ResidentDetail'
import { theme } from '../theme/CustomizedTheme'

function ResidentInfo() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, margin: 4, height: 'calc(100vh - 90px - 32px - 32px)' }}>
        <ResidentDetail />
      </Box>
    </ThemeProvider>
  )
}

export default ResidentInfo
