import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Register from './pages/Register';
import theme from './style/theme'; // Import your custom theme
import './styles.css';

function App() {
  return (
    <ThemeProvider theme={theme}> {/* Apply the theme */}
      <div className="App">
        <Register />
      </div>
    </ThemeProvider>
  );
}

export default App;
