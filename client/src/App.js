import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Register from './pages/RegisterForm';
import Login from './pages/LoginForm';
import theme from './style/theme';
import './styles.css';
import './App.css';

function App() {
  const [currentForm, setCurrentForm] = useState('register');

  const toggleForm = () => {
    setCurrentForm(currentForm === 'login' ? 'register' : 'login');
    console.log("current form" + currentForm)
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {currentForm === 'register' ? (
          <Login onToggleForm={toggleForm} formType={currentForm} />
        ) : (
          <Register onToggleForm={toggleForm} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
