// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A87676', // Set your primary color
    },
    secondary: {
      main: '#fff', // Set your secondary color
    },
    background: {
      default: '#E1ACAC', // Set your background color
    },
  },
  typography: {
    h4: {
      fontWeight: 600, // Customize the font weight of h4
    },
  },
});

export default theme;
