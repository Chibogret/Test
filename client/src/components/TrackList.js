import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import ShipmentModal from './ShipmentModal'; // Adjust the path as necessary
import UpdateMunicipalityModal from './UpdateMunicipality';
import '../styles.css';

// orderDetailsList and onSelectShipment are passed as props to Tracklist
function Tracklist({ orderDetailsList, onSelectShipment }) {
  const [open, setOpen] = useState(false);
  const [openM, setMOpen] = useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMunicipalityOpen = () => setMOpen(true);
  const handleMunicipalityClose = () => setMOpen(false);

  // Function to handle selection of a shipment
  const handleSelectShipment = (shipment) => {
    onSelectShipment(shipment); // Call the function passed from the parent component
  };

  return (
    <div className='sidebar' style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
      <Button className="registerButton" onClick={handleOpen}>Register Shipment</Button>
      <Button className="registerButton" onClick={handleMunicipalityOpen}>Update Municipality</Button>
      <ShipmentModal open={open} handleClose={handleClose} />
      <UpdateMunicipalityModal open={openM} handleClose={handleMunicipalityClose} />

      <Button className="registerButton" style={{border:"none"}}>Tracking shipment</Button>
      {orderDetailsList.map((orderDetails, index) => (
        <Card 
          key={index} 
          variant="outlined" 
          onClick={() => handleSelectShipment(orderDetails)} 
          style={{ marginBottom: '10px' }}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Shipment Number: {orderDetails.shipmentNumber}
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
