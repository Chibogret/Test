import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider'; // Import AuthProvider from its file
import ProtectedRoute from './auth/ProtectedRoute'; // Import ProtectedRoute from its file
import UserProfile from './pages/UserProfile'; // Adjust the path as necessary
import LoginForm from './components/LoginForm'; // Adjust the path as necessary
import FormContainer from './pages/FormContainer'; // Adjust the path as necessary
import theme from './style/theme';
import './styles.css';
import './App.css';

function App() {
  return (
    <AuthProvider> {/* Wrap your application with AuthProvider */}
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<FormContainer />} />
              <Route path="/home" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />

              {/* You can add more routes here */}
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
