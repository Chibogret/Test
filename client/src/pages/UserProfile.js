import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tracklist from '../components/TrackList';
import Navbar from '../components/Navbar'; // Assuming you have this component
import MapComponent from '../components/MapComponent'; // Import the MapComponent
import DetailsComponent from '../components/DetailsSection'; // Import the DetailsComponent
import { municipalities } from '../config/municipalitiesConfig'; // Adjust the path as needed
import Loading from '../components/Loading';

function UserProfile() {
  const [placeholderOrderDetailsList, setOrderDetailsList] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const IP_ADR = process.env.REACT_APP_IP_ADR;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found. Please log in.');
        setOpenSnackbar(true);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://${IP_ADR}:5000/api/shipments/get`);
        setOrderDetailsList(response.data);
        setSelectedShipment(response.data[0]); // Set the first item as selected shipment
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setMessage('Failed to fetch data.');
        setOpenSnackbar(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [IP_ADR]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  if (loading) {
    return <Loading/>
  }

  return (
    <div>
      <div className='app-bar'>
        <Navbar />
      </div>
      <div className="user-profile-container">
        <div className='home-tracklist'>
          <Tracklist
            orderDetailsList={placeholderOrderDetailsList}
            onSelectShipment={setSelectedShipment}
          />
        </div>
        <div className='main-content'>
          <div className='map'>
            <MapComponent municipalities={municipalities} statuses={selectedShipment ? selectedShipment.timeline.reduce((acc, current) => {
              const status = current.status.toLowerCase();
              switch (status) {
                case 'pending':
                  acc[current.name.toUpperCase()] = 3;
                  break;
                case 'current':
                  acc[current.name.toUpperCase()] = 2;
                  break;
                case 'completed':
                  acc[current.name.toUpperCase()] = 1;
                  break;
                case 'completed (skipped)':
                  acc[current.name.toUpperCase()] = 0;
                  break;
                default:
                  acc[current.name.toUpperCase()] = -1;
                  break;
              }
              return acc;
            }, {}) : {}}
            />
          </div>
          <div>
            <DetailsComponent
              orderDetails={selectedShipment}
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
