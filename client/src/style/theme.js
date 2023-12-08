// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E65F67', // Your primary color
    },
    typography: {
        FontFamily: "Lato"
    }
    // Add other theme customizations if needed
  },
});

export default theme;
