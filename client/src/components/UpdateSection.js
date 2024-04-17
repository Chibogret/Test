import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert, Paper, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import InspectorForm from './InspectorForm';
import '../style/updateconfirmation.css';

function UpdateConfirmation(props) {
  const { shipmentDetails } = props;  // Destructure shipmentDetails from props
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { id } = useParams();  // Correctly fetch id from the URL params

  // No longer directly console.log here, it should be used in debugging only if necessary
  console.log(shipmentDetails.livestockHandlerName);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Navbar />
      <Paper className="update-confirmation-details" elevation={0}>
        <Typography variant="h4" className="title">
          Update Confirmation
        </Typography>
        <p>Shipment Update for ID: {id}</p>
        <Divider />
        <p style={{textAlign:"left", fontWeight:"bold"}}>Details</p>
        {shipmentDetails && (
          <>
            <List className="list-container">
              <ListItem>
                <ListItemText primary="Livestock Handler" secondary={shipmentDetails.livestockHandlerName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Plate Number" secondary={shipmentDetails.plateNumber} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Origin" secondary={shipmentDetails.origin} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Destination" secondary={shipmentDetails.destination} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Number of Heads" secondary={shipmentDetails.numberOfHeads} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Date Issued" secondary={shipmentDetails.dateIssued} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Time Issued" secondary={shipmentDetails.timeIssued} />
              </ListItem>
              <ListItem>
                <ListItemText primary="RAS-ASF Control No." secondary={shipmentDetails.rasAsf} />
              </ListItem>
              <ListItem>
                <ListItemText primary="AIC Control No." secondary={shipmentDetails.aic} />
              </ListItem>
            </List>
            <Divider/>
            <p style={{textAlign:"left", fontWeight:"bold"}}>Authorization</p>

            <InspectorForm />
          </>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {shipmentDetails ? shipmentDetails.warningMessage : 'Error fetching data.'}
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
}

export default UpdateConfirmation;
