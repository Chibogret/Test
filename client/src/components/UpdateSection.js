import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar, Alert, Paper, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../style/updateconfirmation.css'; // Import a CSS file for additional styling

function UpdateConfirmation(shipmentDetails) {
  const [shipment, setShipment] = useState(shipmentDetails.shipmentDetails)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { id } = useParams();
  

  const IP_ADR = process.env.REACT_APP_IP_ADR;

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

 
  return (
    <div>
      <Navbar />
      <Paper className="update-confirmation-container" elevation={3}>
        <Typography variant="h4" className="title">
          Update Confirmation
          
        </Typography>
        <p>
        Shipment Update for ID: {id}
        </p>
        {shipment && (
          <>
            <List className="list-container">
              <ListItem>
                <ListItemText primary="Livestock Handler" secondary={shipment.livestockHandlerName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Plate Number" secondary={shipment.plateNumber} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Origin" secondary={shipment.origin} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Destination" secondary={shipment.destination} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Number of Heads" secondary={shipment.numberOfHeads} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Date Issued" secondary={shipment.dateIssued} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Time Issued" secondary={shipment.timeIssued} />
              </ListItem>
              <ListItem>
                <ListItemText primary="RAS-ASF Control No." secondary={shipment.rasAsf} />
              </ListItem>
              <ListItem>
                <ListItemText primary="AIC Control No." secondary={shipment.aic} />
              </ListItem>
            </List>
            <Divider />
            <Typography variant="h5" className="section-title">
              Delivery Status
            </Typography>
          
            {shipment.warningMessage && (
              <Alert severity="warning">{shipment.warningMessage}</Alert>
            )}
          </>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {shipment ? shipment.warningMessage : 'Error fetching data.'}
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
}

export default UpdateConfirmation;
