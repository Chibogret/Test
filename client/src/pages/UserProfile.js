import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tracklist from '../components/TrackList';
import Navbar from '../components/Navbar'; // Assuming you have this component
import MapComponent from '../components/MapComponent'; // Import the MapComponent
import DetailsComponent from '../components/DetailsSection'; // Import the DetailsComponent
import { municipalities } from '../config/municipalitiesConfig'; // Adjust the path as needed




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

  const [selectedMunicipality, setSelectedMunicipality] = useState(null);

  // Function to handle municipality selection, to be passed to MapComponent
  const handleMunicipalitySelect = (municipalityId) => {
    const municipality = municipalities.find(m => m.id === municipalityId);
    const status = statuses[municipalityId];
    setSelectedMunicipality({ ...municipality, status });
  };

  const placeholderOrderDetails = {
    dateIssued: 'July 15, 2024',
    timeIssued: '14:00',
    controlNumbers: {
      rasAsf: '23023 - 229',
      aic: 'S2023 - 317'
    },
    deliveryStatus: [
      { description: 'Checking', date: 'Jan 24', state: 'checking' },
      { description: 'In Transit', date: 'Jan 25', state: 'inTransit' },
      { description: 'Delivering', date: 'Jan 26', state: 'delivering' }
    ],
    timeline: [
      { name: 'BANSUD', status: 'completed', time: '6:25pm' },
      { name: 'GLORIA', status: 'completed', time: '6:25pm' },
      { name: 'PINAMALAYAN', status: 'current', time: '6:25pm' },
      { name: 'NAUJAN', status: 'pending', time: '6:25pm' },
      { name: 'CALAPAN', status: 'pending', time: '6:25pm' }
    ]
  };

  const placeholderSelectedMunicipality = {
    id: '1',
    name: 'Puerto Galera',
    coords: [13.494839, 120.955457],
    status: 1 // Assuming 1 represents an 'active' status
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
          <div>
            <DetailsComponent
            selectedMunicipality={placeholderSelectedMunicipality}
            orderDetails={placeholderOrderDetails}
          />
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
