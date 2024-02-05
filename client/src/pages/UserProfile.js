import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tracklist from '../components/TrackList';
import Navbar from '../components/Navbar'; // Import the Navbar component


function UserProfile() {
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
            'Authorization': `Bearer ${token}`, // Sending token in the Authorization header
          },
        });
        setEmail(response.data.email);
        setMessage('Profile fetched successfully.');
        setOpenSnackbar(true);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setMessage('Failed to fetch profile data. Please check your authentication.');
        setOpenSnackbar(true);
      }
    };

    fetchProfile();
  }, []); // No dependencies needed as localStorage access doesn't rely on component re-render

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  
  return (
    <div>
      <div className='app-bar'>
      <Navbar /> {/* Use the Navbar component */}

      </div>
      
      <div className="user-profile-container">
        
      <div className='home-tracklist'>
        <Tracklist />
      </div>
      <div className='main-content'>
        <p>Email: {email}</p>
      </div>
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
    </div>
    
  );
}

export default UserProfile;
