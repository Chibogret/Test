import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AuthContext } from '../auth/AuthProvider';

function UserProfile() {
  const { user, token } = useContext(AuthContext); // Assuming AuthContext provides the user token
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const IP_ADR = process.env.REACT_APP_IP_ADR;

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!token) {
        setMessage('No token found. Please log in.');
        setOpenSnackbar(true);
        return;
      }
  
      try {
        const response = await axios.get(`http://${IP_ADR}:5000/api/home`, {
          headers: {
            'Authorization': `Bearer ${token}` // Sending token in the Authorization header
          }
        });
        console.log(response)
        setEmail(response.data.email);
        console.log(email)
        setMessage('Profile fetched successfully.');
        setOpenSnackbar(true);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setMessage('Failed to fetch profile data. Please check your authentication.');
        setOpenSnackbar(true);
      }
    };
  
    fetchProfile();
  }, []); // Removed user.id and token dependencies since they are not used directly in the hook
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      <p>Email: {email}</p>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={message.startsWith('Profile fetched successfully') ? "success" : "error"}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserProfile;
