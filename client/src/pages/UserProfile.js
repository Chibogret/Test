import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import from react-router-dom
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tracklist from '../components/TrackList';
import Navbar from '../components/Navbar';
import MapComponent from '../components/MapComponent';
import DetailsComponent from '../components/DetailsSection';
import { municipalities } from '../config/municipalitiesConfig';
import Loading from '../components/Loading';

function UserProfile() {
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const IP_ADR = process.env.REACT_APP_IP_ADR;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found. Please log in.');
        setOpenSnackbar(true);
        setLoading(false);
        return;
      }

      try {
        const responseList = await axios.get(`http://${IP_ADR}:5000/api/shipments/get`);
        setOrderDetailsList(responseList.data);
        const shipmentToSelect = id ? responseList.data.find(s => s._id === id) : responseList.data[0];
        setSelectedShipment(shipmentToSelect);

        if (!shipmentToSelect) {
          setMessage('No shipment found with the given ID.');
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to fetch data.');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [IP_ADR, id]);

  useEffect(() => {
    if (selectedShipment && !id) {
      navigate(`/home/${selectedShipment._id}`); // Navigate using react-router
    }
  }, [selectedShipment, id, navigate]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className='app-bar'>
        <Navbar />
      </div>
      <div className="user-profile-container">
        <div className='home-tracklist'>
          <Tracklist
            orderDetailsList={orderDetailsList}
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
