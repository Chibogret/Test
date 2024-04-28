import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Divider, TextField } from '@mui/material';
import ShipmentModal from './ShipmentModal'; // Adjust the path as necessary
import UpdateMunicipalityModal from './UpdateMunicipality';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import { useEffect } from 'react';


function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


function Tracklist({ orderDetailsList, onSelectShipment }) {
  const [open, setOpen] = useState(false);
  const [openM, setMOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMunicipalityOpen = () => setMOpen(true);
  const handleMunicipalityClose = () => setMOpen(false);

  const handleSelectShipment = (shipmentId) => {
    navigate(`/home/${shipmentId}`); // Navigate to the shipment detail page
  };

  // Update search term based on user input
  const handleSearchChange = (event) => {
    console.log(orderDetailsList[0])
    setSearchTerm(event.target.value.toLowerCase());
  };
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce search term

  const filteredOrders = orderDetailsList.filter(orderDetails =>
    orderDetails._id.toLowerCase().includes(debouncedSearchTerm) ||
    orderDetails.origin.toLowerCase().includes(debouncedSearchTerm) ||
    orderDetails.destination.toLowerCase().includes(debouncedSearchTerm) ||
    orderDetails.dateIssued.toLowerCase().includes(debouncedSearchTerm) ||
    orderDetails.livestockHandlerName.toLowerCase().includes(debouncedSearchTerm) ||
    orderDetails.plateNumber.toLowerCase().includes(debouncedSearchTerm) ||
    (orderDetails.rasAsf && orderDetails.rasAsf.toLowerCase().includes(debouncedSearchTerm)) ||
    (orderDetails.aic && orderDetails.aic.toLowerCase().includes(debouncedSearchTerm)) ||
    orderDetails.deliveryStatus.some(status => status.description.toLowerCase().includes(debouncedSearchTerm) ||
      status.date.toLowerCase().includes(debouncedSearchTerm) ||
      status.state.toLowerCase().includes(debouncedSearchTerm)) ||
    orderDetails.timeline.some(event => event.name.toLowerCase().includes(debouncedSearchTerm) ||
      event.status.toLowerCase().includes(debouncedSearchTerm) ||
      event.time.toLowerCase().includes(debouncedSearchTerm) ||
      event.checkedby.toLowerCase().includes(debouncedSearchTerm))
  );


  return (
    <div className='sidebar' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

      <Button className="registerButton" onClick={handleOpen}>Register Shipment</Button>
      <Button className="registerButton" onClick={handleMunicipalityOpen}>Update Municipality</Button>
      <ShipmentModal open={open} handleClose={handleClose} />
      <UpdateMunicipalityModal open={openM} handleClose={handleMunicipalityClose} />
      <Divider />
      <Button className="registerButton" disabled style={{ color: "black", borderTop: "none" }}>Tracking shipment</Button>
      <TextField
        label="Search Shipments"
        variant="outlined"
        onChange={handleSearchChange}
        className="searchBar"
        style={{ marginBottom: '10px' }}
      />
      {filteredOrders.map((orderDetails, index) => (
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
  );
}

export default Tracklist;
