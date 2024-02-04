import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Correct the import statement

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const decodeToken = token => {
  try {
    const decoded = jwtDecode(token);
    // Check if the token is expired
    const currentTime = Date.now() / 1000; // convert to seconds
    if (decoded.exp && decoded.exp < currentTime) {
      console.error('Token is expired');
      return null;
    }
    return decoded;
  } catch (error) {
    console.error('Token decoding failed', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = decodeToken(token);
      if (userData) {
        setUser({ ...userData, token });
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser({ ...userData, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const decodedToken = decodeToken(token);
    return !!decodedToken; // Return true if the token is valid, false otherwise
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
