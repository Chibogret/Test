import React, { useState, useEffect} from 'react';
import { Modal, Box, Typography, Select, MenuItem, TextField, Button } from '@mui/material';
import { municipalities } from '../config/municipalitiesConfig'; // Ensure this path is correct
import axios from 'axios';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    border: '1px solid #333',
    borderRadius: "5px",
    p: 4,
};

function ShipmentTrackingModal({ open, handleClose }) {
    // State for form fields
    const [livestockHandler, setLivestockHandler] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [numberOfHeads, setNumberOfHeads] = useState('');
    const [rasAsfControlNumber, setRasAsfControlNumber] = useState('');
    const [aicControlNumber, setAicControlNumber] = useState('');
    const [inspector, setInspector] = useState('');

    const IP_ADR = process.env.REACT_APP_IP_ADR;

    const fetchInspectorData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in local storage.');
                return;
            }

            const response = await axios.get(`http://${IP_ADR}:5000/api/user/userinfo`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const { firstName, lastName, municipality } = response.data;
            setInspector(`${toTitleCase(firstName)} ${toTitleCase(lastName)}`);
        } catch (error) {
            console.error('Failed to fetch inspector data:', error);
        }
    };

    useEffect(() => {
        fetchInspectorData();
    }, []);

    const toTitleCase = (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();


    const handleSubmit = async (event) => {
        // Convert numberOfHeads to a number to ensure proper data type is sent
        const numericNumberOfHeads = parseInt(numberOfHeads, 10);
    
        // Simple form validation check
        if (!livestockHandler || !plateNumber || !origin || !destination || isNaN(numericNumberOfHeads) || !rasAsfControlNumber || !aicControlNumber || !inspector) {
            alert('Please fill in all required fields correctly.');
            return; // Stop the submission if validation fails
        }
    
        const shipmentData = {
            livestockHandlerName: livestockHandler,
            plateNumber: plateNumber,
            origin: origin,
            destination: destination,
            numberOfHeads: numericNumberOfHeads, // Use the converted number
            rasAsfControlNumber: rasAsfControlNumber,
            aicControlNumber: aicControlNumber,
            issuedBy: inspector // Assign the inspector name
        };
    
        console.log(shipmentData);
    
        try {
            const response = await axios.post(`http://${IP_ADR}:5000/api/shipments/register-shipment`, shipmentData);
            console.log(response.data);
            handleClose(); // Close modal upon successful submission
            // Optionally, reset form state here if the modal will be reused
        } catch (error) {
            console.error('Error submitting shipment data', error);
            event.preventDefault();

            // Provide user feedback on error
            alert('Error submitting shipment data. Please try again.'); // Consider using a more user-friendly error display method
        }
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="shipment-tracking-modal-title"
            aria-describedby="shipment-tracking-modal-description"
        >
            <Box sx={modalStyle} component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <Typography id="shipment-tracking-modal-title" variant="h6" component="h2" marginBottom={2}>
                    Input Shipment Tracking Details
                </Typography>
                <TextField
                    margin="normal"
                    id="livestock-handler"
                    label="Name of Livestock Handler"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={livestockHandler}
                    onChange={(e) => setLivestockHandler(e.target.value)}
                    required
                />
                <TextField
                    margin="normal"
                    id="plate-number"
                    label="Plate Number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    required
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingTop: '5px' }}>

                    <Select
                        labelId="origin-label"
                        id="origin"
                        value={origin}
                        displayEmpty // This makes the first empty value visible even when not selected
                        onChange={(e) => setOrigin(e.target.value)}
                        required
                    >
                        <MenuItem value="" disabled>
                            Origin
                        </MenuItem>
                        {municipalities.map((municipality) => (
                            <MenuItem key={municipality.id} value={municipality.name}>
                                {municipality.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        labelId="destination-label"
                        id="destination"
                        value={destination}
                        displayEmpty // This makes the first empty value visible even when not selected
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    >
                        <MenuItem value="" disabled>
                            Destination
                        </MenuItem>
                        {municipalities.map((municipality) => (
                            <MenuItem key={municipality.id} value={municipality.name}>
                                {municipality.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <TextField
                    margin="normal"
                    id="number-of-heads"
                    label="Number of Heads"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={numberOfHeads}
                    onChange={(e) => setNumberOfHeads(e.target.value)}
                    required
                />
                <TextField
                    margin="normal"
                    id="ras-asf-control-number"
                    label="RAS-ASF Control Number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={rasAsfControlNumber}
                    onChange={(e) => setRasAsfControlNumber(e.target.value)}
                    required
                />
                <TextField
                    margin="normal"
                    id="aic-control-number"
                    label="AIC Control Number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={aicControlNumber}
                    onChange={(e) => setAicControlNumber(e.target.value)}
                    required
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={handleClose} sx={{ mr: 1 }}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>

                </Box>
            </Box>
        </Modal>
    );
}

export default ShipmentTrackingModal;