// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00B69D', // Your primary color
    },
    secondary: {
      main: "#4CAF50",
    },
    typography: {
        FontFamily: "Lato"
    }
    // Add other theme customizations if needed
  },
});

export default theme;
