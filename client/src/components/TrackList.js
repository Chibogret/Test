import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Divider, TextField } from '@mui/material';
import ShipmentModal from './ShipmentModal'; // Adjust the path as necessary
import UpdateMunicipalityModal from './UpdateMunicipality';
import RegisterUserForm from './RegisterUserForm';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import axios from 'axios'; // Make sure to import axios at the top of your file


import { debounce } from 'lodash'; // Use lodash to debounce the function

function Tracklist() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openM, setMOpen] = useState(false);
  const [openU, setUOpen] = useState(false);

  const navigate = useNavigate();

  // Function to handle opening and closing modals
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUserOpen = () => setUOpen(true);
  const handleUserClose = () => setUOpen(false);
  const handleMunicipalityOpen = () => setMOpen(true);
  const handleMunicipalityClose = () => setMOpen(false);


  const IP_ADR = process.env.REACT_APP_IP_ADR;

  const handleSelectShipment = (shipmentId) => {
    navigate(`/home/${shipmentId}`);
  };

  // Function to fetch data using Axios
const fetchData = async () => {
  try {
    const response = await axios.get(`http://${IP_ADR}:5000/api/shipments/search?search=${searchQuery}`);
    setOrderDetailsList(response.data); // Axios wraps the response data inside a `data` property
  } catch (error) {
    console.error('Failed to fetch order details:', error);
  }
};

  // Debounce fetchData so it only triggers after user has stopped typing for 500ms
  const debouncedFetchData = debounce(fetchData, 500);

  // Effect to fetch data when searchQuery changes
  useEffect(() => {
    if (searchQuery.length === 0 || searchQuery.length > 2) { // Optionally check for minimum length of query
      debouncedFetchData();
    }
  }, [searchQuery]);

  return (
    <div className='sidebar' style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
      <Button className="registerButton" onClick={handleUserOpen}>Register User</Button>
      <Button className="registerButton" onClick={handleOpen}>Register Shipment</Button>
      <Button className="registerButton" onClick={handleMunicipalityOpen}>Update Municipality</Button>
      <RegisterUserForm openU={openU} handleUserClose={handleUserClose} />
      <ShipmentModal open={open} handleClose={handleClose} />
      <UpdateMunicipalityModal open={openM} handleClose={handleMunicipalityClose} />
      <Divider/>
      <Button className="registerButton" disabled style={{ color: "black", border:"none"}}>Tracking shipment</Button>
      <TextField
        label="Search Shipments"
        variant="outlined"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchBar"
        style={{ marginBottom: '10px' }}
      />
      <div style={{ height: '100%', overflowY: 'auto' }}>
        {orderDetailsList.map((orderDetails, index) => (
          <Card 
            key={index} 
            variant="outlined" 
            onClick={() => handleSelectShipment(orderDetails._id)}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h8" component="div">
                  {orderDetails.origin} to {orderDetails.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {orderDetails.dateIssued}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}     
export default Tracklist;