import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert, Button, Paper, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import InspectorForm from './InspectorForm';
import '../style/updateconfirmation.css';

function UpdateConfirmation(props) {
  const { shipmentDetails } = props;  // Destructure shipmentDetails from props
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { id } = useParams();  // Correctly fetch id from the URL params
  const [inspector, setInspector] = useState('');
  const [heads, setHead] = useState('');
  const [checkpoint, setCheckpoint] = useState('');

  const IP_ADR = process.env.REACT_APP_IP_ADR;

  const handleHeadChange = (newHead) => {
    setHead(newHead);
    console.log('Head updated in Parent:', heads);
  };

  const handleInspectorChange = (newInspector) => {
    setInspector(newInspector);
    console.log('Inspector updated in Parent:', inspector);
  };
  const handleCheckpointChange = (newCheckpoint) => {
    setCheckpoint(newCheckpoint);
    console.log('Checkpoint updated in Parent:', checkpoint);
  };

  // No longer directly console.log here, it should be used in debugging only if necessary
  console.log(shipmentDetails.livestockHandlerName);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  const handleSubmit = async (event) => {
    // Validate input fields before submitting
    if (!inspector || inspector.trim() === '') {
      alert('Inspector name is required');
      return;
    }

    if (!checkpoint || checkpoint.trim() === '') {
      alert('Checkpoint is required');
      return;
    }

    // Log for debugging; consider removing or replacing with more formal logging
    console.log('Submitting', { inspector, checkpoint });
    
    try {
      // Assuming shipmentdetails is available globally or passed as an argument
      if (!shipmentDetails || !shipmentDetails.timeline || !shipmentDetails.timeline.some(entry => entry.name.toUpperCase() === checkpoint.toUpperCase())) {
        event.preventDefault();
        alert('Account not authorized to update this checkpoint.');
        return;
      }

      const existingCheckpoint = shipmentDetails.timeline.find(entry => entry.name.toUpperCase() === checkpoint.toUpperCase());
      if (existingCheckpoint.checkedby !== '-' || existingCheckpoint.currentHeads === 0) {
        event.preventDefault();
        alert('Checkpoint has already been checked by someone.');
        return;
      }

      const response = await axios.put(`http://${IP_ADR}:5000/api/shipments/update/${id}`, {
        inspector: inspector,
        checkpointName: checkpoint.toUpperCase(),
        currentHeads: heads
      });

      // Assuming the response body has the success status and data
      if (response.status === 200) {
        setOpenSnackbar(true);  // Show success message
        console.log('Update successful:', response.data);
      } else {
        throw new Error('Failed to update shipment details');
      }
    } catch (error) {
      event.preventDefault();      
      console.error('Update error:', error);
      alert('Error updating shipment details: ' + error.message);
    }
};


  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <Paper className="update-confirmation-details" elevation={0}>
          <Typography variant="h4" className="title">
            Update Confirmation
          </Typography>
          <p>Shipment Update for ID: {id}</p>
          <Divider />
          <p style={{ textAlign: "left", fontWeight: "bold" }}>Details</p>
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
              <Divider />
              <p style={{ textAlign: "left", fontWeight: "bold" }}>Authorization</p>

              <InspectorForm onInspectorChange={handleInspectorChange} onHeadChange= {handleHeadChange} checkpointList={shipmentDetails.timeline} onCheckpointChange={handleCheckpointChange} />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update              </Button>
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
      </form>
    </div>
  );
}

export default UpdateConfirmation;
