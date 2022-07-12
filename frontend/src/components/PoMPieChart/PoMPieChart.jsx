import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography, Stack, TextField, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

import Title from '../Title/Title';

const data = [
  { name: 'Regular Notes', value: 20 },
  { name: 'Special Notes', value: 5 },
  { name: 'Caregivers\' Notes', value: 10 },
];

const COLORS = ['#32c2b48f', '#8884d8', '#32c49fbf'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PoMPieChart() {
  const navigate = useNavigate()
  const [selectedEndDate, setEndDate] = useState(new Date());
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 7)
  const [selectedStartDate, setStartDate] = useState(startDate);

  const handleDateChange = (newDate, type) => {
    if (type === 'endDate') {
      setEndDate(newDate);
    } else {
      setStartDate(newDate)
    }
  };

  const handleNavigateToNote = () => {
    navigate('/')
  }

  return (
    <>
      <Box sx={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
        <Typography component="h2" variant="h6" sx={{ marginRight: '10px' }}>
          Notes
        </Typography>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Start Date"
              // inputFormat="dd-MM-yyyy"
              value={selectedStartDate}
              onChange={(newDate) => handleDateChange(newDate, 'startDate')}
              renderInput={(params) => <TextField sx={{ marginRight: '5px' }} size="small" {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="End Date"
              // inputFormat="dd-MM-yyyy"
              value={selectedEndDate}
              onChange={(newDate) => handleDateChange(newDate, 'endDate')}
              renderInput={(params) => <TextField sx={{ marginLeft: '5px' }} size="small" {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </Box>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          // label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <Typography sx={{ cursor: 'pointer', textDecoration: 'underline' }} color="primary" onClick={handleNavigateToNote}>
        Manage Residents' Notes
      </Typography>
    </>
  );
}