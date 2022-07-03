import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#32c2b4',
      darker: '#053e85',
      contrastText: '#fff'
    },
    neutral: {
      main: '#fff',
      contrastText: '#32c2b4',
    },
  },
});