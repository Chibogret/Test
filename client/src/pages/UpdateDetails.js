import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UpdateComponent from '../components/UpdateSection';
import '../style/updateconfirmation.css';
import InspectorForm from '../components/InspectorForm';

function UpdateConfirmation() {
  const [orderDetails, setOrderDetails] = useState({});
  const [deliveryStatus, setDeliveryStatus] = useState({});
  const [warningMessage, setWarningMessage] = useState('');
  const { id } = useParams();
  
  const [selectedShipment, setSelectedShipment] = useState(null);

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

  const placeholderSelectedMunicipality = {
    id: '1',
    name: 'Puerto Galera',
    coords: [13.494839, 120.955457],
    status: 1 // Assuming 1 represents an 'active' status
  };

  const IP_ADR = process.env.REACT_APP_IP_ADR;
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setWarningMessage('No token found. Please log in.');
        return;
      }

      try {
        const response = await axios.get(`http://${IP_ADR}:5000/api/shipments/details/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setOrderDetails(response.data.orderDetails);
        setDeliveryStatus(response.data.deliveryStatus);
        setWarningMessage(response.data.warning);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [IP_ADR, id]);

  return (
    <div>
      <Navbar />
      <div className="update-confirmation">
        <div className="main-content">
          <UpdateComponent
              shipmentDetails={orderDetails}
            />
          
          {warningMessage && (
            <div className='warning-message'>
              <Alert severity="warning">{warningMessage}</Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateConfirmation;
