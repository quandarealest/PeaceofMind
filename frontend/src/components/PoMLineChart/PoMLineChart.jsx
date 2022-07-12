import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Typography, Stack, TextField, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, linearGradient, Area, Label } from 'recharts';

import Title from '../Title/Title';
import { theme } from '../../theme/CustomizedTheme'

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  {
    name: '00:00',
    Residents: 30,
    Employees: 19,
  },
  {
    name: '03:00',
    Residents: 30,
    Employees: 19,
  },
  {
    name: '06:00',
    Residents: 30,
    Employees: 25,
  },
  {
    name: '09:00',
    Residents: 29,
    Employees: 35,
  },
  {
    name: '12:00',
    Residents: 29,
    Employees: 30,
  },
  {
    name: '15:00',
    Residents: 29,
    Employees: 35,
  },
  {
    name: '18:00',
    Residents: 30,
    Employees: 60,
  },
  {
    name: '21:00',
    Residents: 30,
    Employees: 40,
  },
  {
    name: '23:00',
    Residents: 30,
    Employees: 25,
  },
];

export default function PoMLineChart() {
  const navigate = useNavigate()
  const theme = useTheme();
  const [selectedDate, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleNavigateToScheduling = () => {
    navigate('/')
  }

  return (
    <>
      <Box sx={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
        <Typography component="h2" variant="h6" sx={{ marginRight: '10px' }}>
          Employees Capacity
        </Typography>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Date"
              // inputFormat="dd-MM-yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField sx={{ maxWidth: '170px' }} size="small" {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </Box>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={200} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 15 }}>
          <defs>
            <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEmp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
              <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name">
            <Label value="Time" offset={0} position="bottom" />
          </XAxis>
          <YAxis label={{ value: 'Number', angle: -90, position: 'insideLeft' }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="Residents" stroke="#8884d8" fillOpacity={1} fill="url(#colorRes)" />
          <Area type="monotone" dataKey="Employees" stroke={theme.palette.primary.main} fillOpacity={1} fill="url(#colorEmp)" />
        </AreaChart>
      </ResponsiveContainer>
      <Typography sx={{ cursor: 'pointer', textDecoration: 'underline' }} color="primary" onClick={handleNavigateToScheduling}>
        Manage Scheduling
      </Typography>
    </>
  );
}