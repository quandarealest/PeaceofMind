import { Box, Grid, Paper } from '@mui/material'

import PoMLineChart from '../PoMLineChart/PoMLineChart'
import PoMPieChart from '../PoMPieChart/PoMPieChart'
import AdminDashboard from '../AdminDashboard/AdminDashboard'

function SupervisorDashboard(props) {
  return (
    <>
      <Box sx={{ width: { xs: 420, sm: 730, md: '100%', lg: '100%' } }} >
        <Grid container spacing={3}>
          {/* Area Chart */}
          <Grid item xs={12} md={8} lg={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <PoMLineChart />
            </Paper>
          </Grid>
          {/* Pie Chart */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <PoMPieChart />
            </Paper>
          </Grid>
        </Grid>
        {/* Tables */}
        <AdminDashboard />
      </Box>
    </>
  )
}

export default SupervisorDashboard
