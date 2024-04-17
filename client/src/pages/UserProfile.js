import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tracklist from '../components/TrackList';
import Navbar from '../components/Navbar'; // Assuming you have this component
import MapComponent from '../components/MapComponent'; // Import the MapComponent
import DetailsComponent from '../components/DetailsSection'; // Import the DetailsComponent
import { municipalities } from '../config/municipalitiesConfig'; // Adjust the path as needed

// const placeholderOrderDetailsList = [
//   {
//     orderId: 1,
//     dateIssued: 'July 15, 2024',
//     timeIssued: '14:00',
//     controlNumbers: {
//       rasAsf: '23023 - 229',
//       aic: 'S2023 - 317'
//     },
//     deliveryStatus: [
//       { description: 'Checking', date: 'Jan 24', state: 'checking' },
//       { description: 'In Transit', date: 'Jan 25', state: 'inTransit' },
//       { description: 'Delivering', date: 'Jan 26', state: 'delivering' }
//     ],
//     timeline: [
//       { name: 'BANSUD', status: 'completed', time: '6:25pm' },
//       { name: 'GLORIA', status: 'completed', time: '6:25pm' },
//       { name: 'PINAMALAYAN', status: 'current', time: '6:25pm' },
//       { name: 'NAUJAN', status: 'pending', time: '6:25pm' },
//       { name: 'CALAPAN', status: 'pending', time: '6:25pm' }
//     ]
//   },
//   // Duplicate and modify for another order
//   {
//     orderId: 2,
//     dateIssued: 'July 20, 2024',
//     timeIssued: '10:00',
//     controlNumbers: {
//       rasAsf: '24024 - 330',
//       aic: 'S2024 - 418'
//     },
//     deliveryStatus: [
//       { description: 'Preparing', date: 'July 21', state: 'preparing' },
//       { description: 'In Transit', date: 'July 22', state: 'inTransit' },
//       { description: 'Delivered', date: 'July 23', state: 'delivered' }
//     ],
//     timeline: [
//       { name: 'SABLAYAN', status: 'completed', time: '2:15pm' },
//       { name: 'SAN JOSE', status: 'completed', time: '3:00pm' },
//       { name: 'MAGSAYSAY', status: 'current', time: '4:45pm' },
//       { name: 'CALINTAAN', status: 'pending', time: 'Expected 5:30pm' },
//       { name: 'RIZAL', status: 'pending', time: 'Expected 6:00pm' }
//     ]
//   },
//   // Add more orders as needed
// ];



function UserProfile() {
  const [placeholderOrderDetailsList, setOrderDetailsList] = useState([]);
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

    const fetchOrderDetails = async () => {
      try {
        // Replace the URL with your actual endpoint that returns the order details
        const response = await axios.get(`http://${IP_ADR}:5000/api/shipments/get`);
        setOrderDetailsList(response.data); // Set the state with the fetched data
      } catch (err) {
        console.error('Error fetching order details:', err);
        setMessage('Failed to fetch order details.');
        setOpenSnackbar(true);
      }
    };

    fetchOrderDetails();
    fetchProfile();
  }, [IP_ADR]); // No dependencies needed as localStorage access doesn't rely on component re-render


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const placeholderOrderDetails = {
    dateIssued: 'July 15, 2024',
    timeIssued: '14:00',
    rasAsf: '23023 - 229',
    aic: 'S2023 - 317',
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


  const [selectedShipment, setSelectedShipment] = useState(placeholderOrderDetails);


  const dynamicStatuses = selectedShipment.timeline.reduce((acc, current) => {
    // Convert the status to lowercase for consistent comparison, assuming that
    // the status might not always be in a consistent case format.
    const status = current.status.toLowerCase();

    // Use a switch-case for clarity and potential extension
    switch (status) {
      case 'current':
        acc[current.name.toUpperCase()] = 2;
        break;
      case 'completed':
        acc[current.name.toUpperCase()] = 1;
        break;
      default:
        acc[current.name.toUpperCase()] = 0;
        break;
    }
    return acc;
  }, {});





  return (
    <div>
      <div className='app-bar'>
        <Navbar /> {/* Use the Navbar component */}
      </div>

      <div className="user-profile-container">
        <div className='home-tracklist'>
          <Tracklist
            orderDetailsList={placeholderOrderDetailsList}
            onSelectShipment={(shipment) => setSelectedShipment(shipment)}
          />        </div>
        <div className='main-content'>
          <div className='map'>
            <MapComponent municipalities={municipalities} statuses={dynamicStatuses} />
          </div>
          <div>
            <DetailsComponent
              orderDetails={selectedShipment || placeholderOrderDetails}
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
