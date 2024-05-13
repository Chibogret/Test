import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert, Button, Paper, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import InspectorForm from './InspectorForm';
import '../style/updateconfirmation.css';

import ConfirmationModal from './ConfirmationModal';

function UpdateConfirmation(props) {
  const { shipmentDetails } = props;  // Destructure shipmentDetails from props
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { id } = useParams();  // Correctly fetch id from the URL params
  const [inspector, setInspector] = useState('');
  const [heads, setHead] = useState('');
  const [checkpoint, setCheckpoint] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmAction = () => {
    handleSubmit();
    handleCloseModal();
  };

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
    event.preventDefault();  // Prevent default form submission behavior
    if (!inspector || inspector.trim() === '') {
      alert('Inspector name is required');
      return;
    }
    if (!checkpoint || checkpoint.trim() === '') {
      alert('Checkpoint is required');
      return;
    }
    try {
      const existingCheckpoint = shipmentDetails.timeline.find(entry => entry.name.toUpperCase() === checkpoint.toUpperCase());
      if (existingCheckpoint.checkedby !== '-' || existingCheckpoint.currentHeads !== 0) {
        alert(`Checkpoint has already been checked by ${existingCheckpoint.checkedby}.`);
        return;
      }

      const response = await axios.put(`http://${IP_ADR}:5000/api/shipments/update/${id}`, {
        inspector,
        checkpointName: checkpoint.toUpperCase(),
        currentHeads: heads
      });

      if (response.status === 200) {
        console.log('Update successful:', response.data);
      } else {
        throw new Error('Failed to update shipment details');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating shipment details: ' + error.message);
    } finally {
      handleCloseModal();  // Close modal after submit
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

              <InspectorForm onInspectorChange={handleInspectorChange} onHeadChange={handleHeadChange} checkpointList={shipmentDetails.timeline} onCheckpointChange={handleCheckpointChange} />
              <Button onClick={handleOpenModal} variant="contained" color="primary" fullWidth>
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
          <ConfirmationModal
            open={modalOpen}
            handleClose={handleCloseModal}
            handleConfirm={handleSubmit}  // Passing handleSubmit as the confirmation action
            title="Confirm Submission"
          >
              {`You are about to log ${heads} heads. This action is irreversible. Please confirm your submission.`}
          </ConfirmationModal>
        </Paper>
      </form>
    </div>
  );
}

export default UpdateConfirmation;
