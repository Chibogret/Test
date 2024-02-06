import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tracklist from '../components/TrackList';
import Navbar from '../components/Navbar'; // Assuming you have this component
import MapComponent from '../components/MapComponent'; // Import the MapComponent

const municipalities = [
  { id: '1', name: 'Puerto Galera', coords: [13.494839, 120.955457] },
  { id: '2', name: 'San Teodoro', coords: [13.1981, 121.4163]},
  { id: '3', name: 'Baco', coords: [13.357614, 121.097109] },
  { id: '4', name: 'Calapan City', coords: [13.4067, 121.1744]},
  { id: '5', name: 'Naujan', coords: [13.3304, 121.3405] },
  { id: '6', name: 'Victoria', coords: [13.2483, 121.1919] },
  { id: '7', name: 'Socorro', coords: [12.9519, 121.3963] },
  { id: '8', name: 'Pinamalayan', coords: [13.0425, 121.5648] },
  { id: '9', name: 'Gloria', coords: [13.1981, 121.4163] },
  { id: '10', name: 'Bansud', coords: [13.1981, 121.4163] },
  { id: '11', name: 'Bongabong', coords: [12.9522, 121.3613] },
  { id: '12', name: 'Roxas', coords: [12.5781, 122.2708]},
  { id: '13', name: 'Mansalay', coords: [12.5825, 121.3963]},
  { id: '14', name: 'Bulalacao', coords: [12.5825, 121.3963]}
  // Add more municipalities as needed
];

const statuses = {
  '1': 1, // Status for Puerto Galera
  '2': 0, // Status for San Teodoro
  '3': 0, // Status for Baco
  '4': 1, // Status for Calapan City
  '5': 0, // Status for Naujan
  '6': 1, // Status for Victoria
  '7': 1, // Status for Socorro
  '8': 0, // Status for Pinamalayan
  '9': 1, // Status for Gloria
  '10': 0, // Status for Bansud
  '11': 1, // Status for Bongabong
  '12': 0, // Status for Roxas
  '13': 1, // Status for Mansalay
  '14': 0, // Status for Bulalacao
  // Add statuses for other municipalities
};


function UserProfile() {
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
        // Assuming you want to keep the success message
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
          <div className='map'>
            {/* Here, we replace the email display with the MapComponent */}
            <MapComponent municipalities={municipalities} statuses={statuses} />
          </div>
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
