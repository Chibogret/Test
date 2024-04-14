import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import Navbar from '../components/Navbar'; // Assuming you have this component

function UpdateConfirmation() {
  const [updateStatus, setUpdateStatus] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const IP_ADR = process.env.REACT_APP_IP_ADR;

  useEffect(() => {
    const updateData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found. Please log in.');
        setOpenSnackbar(true);
        return;
      }

      try {
        const response = await axios.post(`http://${IP_ADR}:5000/api/update`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          data: {
            // Assuming there's data to be updated; specify here.
          },
        });
        setUpdateStatus(true);
        setMessage('Update successful.');
        setOpenSnackbar(true);
      } catch (err) {
        console.error('Error during update:', err);
        setMessage('Failed to update data. Please check your authentication.');
        setOpenSnackbar(true);
      }
    };

    updateData();
  }, [IP_ADR]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <div className='app-bar'>
        <Navbar /> {/* Assuming Navbar component is reused */}
      </div>

      <div className="update-confirmation-container">
        <div className="main-content">
          <div className='confirmation-message'>
            {updateStatus ? (
              <h1>Update Confirmed!</h1>
            ) : (
              <h1>Waiting for Update...</h1>
            )}
          </div>
        </div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={message.startsWith('Update successful') ? "success" : "error"}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default UpdateConfirmation;
