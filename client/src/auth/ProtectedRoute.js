import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();  // Get the current location

  console.log('isAuthenticated DEINYEL', isAuthenticated());
  if (!isAuthenticated()) {
    // Redirect to the login page if not authenticated, and pass the current location in state
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
