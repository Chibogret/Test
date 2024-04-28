import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import UserProfile from './pages/UserProfile';
import LoginForm from './components/LoginForm';
import FormContainer from './pages/FormContainer';
import UpdateConfirmation from './pages/UpdateDetails'; // Import the new UpdatePage component
import theme from './style/theme';
import './styles.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<FormContainer />} />
              <Route path="/home/:id?" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              <Route path="/update/:id" element={
                <ProtectedRoute>
                  <UpdateConfirmation />
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
