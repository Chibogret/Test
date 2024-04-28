import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Select, MenuItem, TextField, Button, InputLabel } from '@mui/material';
import { municipalities, StatusEnum, OutbreakStatus } from '../config/municipalitiesConfig'; // Ensure this path is correct

import axios from 'axios';
import WarningList from './WarningList';

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

function UpdateMunicipalityModal({ open, handleClose }) {

    const IP_ADR = process.env.REACT_APP_IP_ADR;

    const [currentStep, setCurrentStep] = useState(1);


    // State for form fields
    const [municipality, setMunicipality] = useState('');
    const [checkpointStatus, setCheckpointStatus] = useState('');
    const [startTime, setStartTime] = useState('08:00 AM');
    const [endTime, setEndTime] = useState('05:00 PM');

    const [outbreakStatus, setOutbreakStatus] = useState('');

    // Define state hooks for Veterinary Authority
    const [vetAuthorityName, setVetAuthorityName] = useState('');
    const [vetAuthorityPhone, setVetAuthorityPhone] = useState('');
    const [vetAuthorityEmail, setVetAuthorityEmail] = useState('');

    // Define state hooks for Emergency Response Team
    const [emergencyResponseTeamName, setEmergencyResponseTeamName] = useState('');
    const [emergencyResponseTeamPhone, setEmergencyResponseTeamPhone] = useState('');
    const [emergencyResponseTeamEmail, setEmergencyResponseTeamEmail] = useState('');

    const statusValues = Object.values(StatusEnum);
    const outbreakStatusValues = Object.values(OutbreakStatus);

    const [itemsFromChild, setItemsFromChild] = useState(() => {
        const savedItems = localStorage.getItem('itemsFromChild');
        return savedItems ? JSON.parse(savedItems) : [];
    });

    const handleItemsChange = (newItems) => {
        setItemsFromChild(newItems);
    };

    useEffect(() => {
        localStorage.setItem('itemsFromChild', JSON.stringify(itemsFromChild));
    }, [itemsFromChild]);

    const handleSubmit = async (e) => {
                // Map the state to the structure of the Municipality schema
        const formData = {
            name: municipality,
            checkpoint: {
                name: municipality, // Assuming checkpoint name should be the same as municipality name; adjust if incorrect
                operationalStatus: checkpointStatus,
                timesOfActivity: `${startTime} - ${endTime}`,
            },
            asfStatus: outbreakStatus,
            movementData: [], // Placeholder for movement data, needs actual handling
            alerts: itemsFromChild, // Now correctly assigning itemsFromChild to alerts
            contactInfo: {
                veterinaryAuthority: {
                    name: vetAuthorityName,
                    phoneNumber: vetAuthorityPhone,
                    email: vetAuthorityEmail,
                },
                emergencyResponseTeam: {
                    name: emergencyResponseTeamName,
                    phoneNumber: emergencyResponseTeamPhone,
                    email: emergencyResponseTeamEmail,
                }
            }
        };

        try {
            // Replace with your actual API endpoint
            const response = await axios.put(`http://${IP_ADR}:5000/api/municipalities/update/${encodeURIComponent(municipality)}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    // Include authentication headers if required
                },
            });
            localStorage.removeItem("itemsFromChild")
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleCancel = () => {
        localStorage.removeItem("itemsFromChild")
        handleClose();
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="shipment-tracking-modal-title"
            aria-describedby="shipment-tracking-modal-description"
        >
            <Box sx={modalStyle} component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <Typography id="shipment-tracking-modal-title" variant="h6" component="h2" marginBottom={2}>
                    Update Municipality
                </Typography>
                {currentStep === 1 && (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingTop: '5px' }}>
                            <InputLabel id="origin-label">Municipality</InputLabel>

                            <Select
                                labelId="origin-label"
                                id="origin"
                                value={municipality}
                                displayEmpty // This makes the first empty value visible even when not selected
                                onChange={(e) => setMunicipality(e.target.value)}
                                required
                            >
                                <MenuItem value="" disabled>
                                    Municipality
                                </MenuItem>
                                {municipalities.map((municipality) => (
                                    <MenuItem key={municipality.id} value={municipality.name}>
                                        {municipality.name}
                                    </MenuItem>
                                ))}
                            </Select>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                            <InputLabel id="checkpoint-label">Checkpoint Status</InputLabel>

                            <Select
                                labelId="checkpoint-label"
                                id="checkpoint"
                                value={checkpointStatus}
                                displayEmpty // This makes the first empty value visible even when not selected
                                onChange={(e) => setCheckpointStatus(e.target.value)}
                                required
                            >
                                <MenuItem value="" disabled>
                                    Operational Status
                                </MenuItem>
                                {statusValues.map((status, index) => (
                                    <MenuItem
                                        key={index}
                                        value={status}
                                        style={{
                                            color: status === 'Active' ? 'green' : status === 'Inactive' ? 'red' : 'orange'
                                        }}
                                    >
                                        {status}
                                    </MenuItem>
                                ))}

                            </Select>
                            {/* Time range input: Start Time */}
                            <TextField
                                id="startTime"
                                label="Start Time"
                                type="time"
                                defaultValue="08:00"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 minutes
                                }}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />

                            {/* Time range input: End Time */}
                            <TextField
                                id="endTime"
                                label="End Time"
                                type="time"
                                defaultValue="17:00"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 minutes
                                }}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />


                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                            <InputLabel id="outbreakStatus-label">Outbreak Status</InputLabel>
                            <Select
                                labelId="outbreakStatus-label"
                                id="outbreakStatus"
                                value={outbreakStatus}
                                displayEmpty // This makes the first empty value visible even when not selected
                                onChange={(e) => setOutbreakStatus(e.target.value)}
                                required
                            >
                                <MenuItem value="" disabled>
                                    Outbreak Status
                                </MenuItem>
                                {outbreakStatusValues.map((status, index) => (
                                    <MenuItem
                                        key={index}
                                        value={status}
                                    >
                                        {status}
                                    </MenuItem>
                                ))}

                            </Select>
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button onClick={handleCancel} sx={{ mr: 1 }}>
                                Cancel
                            </Button>
                            <Button onClick={handleNext} variant="contained">
                                Next
                            </Button>
                        </Box>
                    </>)}

                {currentStep === 2 && (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                            <InputLabel id="veterinary-authority-label">Veterinary Authority Contact Information</InputLabel>
                            <TextField
                                id="veterinary-authority-name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={vetAuthorityName}
                                onChange={(e) => setVetAuthorityName(e.target.value)}
                                required
                            />
                            <TextField
                                id="veterinary-authority-phone"
                                label="Phone Number"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={vetAuthorityPhone}
                                onChange={(e) => setVetAuthorityPhone(e.target.value)}
                                required
                            />
                            <TextField
                                id="veterinary-authority-email"
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={vetAuthorityEmail}
                                onChange={(e) => setVetAuthorityEmail(e.target.value)}
                                required
                            />

                            <InputLabel id="emergency-response-team-label">Emergency Response Team Contact Information</InputLabel>
                            <TextField
                                id="emergency-response-team-name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={emergencyResponseTeamName}
                                onChange={(e) => setEmergencyResponseTeamName(e.target.value)}
                                required
                            />
                            <TextField
                                id="emergency-response-team-phone"
                                label="Phone Number"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={emergencyResponseTeamPhone}
                                onChange={(e) => setEmergencyResponseTeamPhone(e.target.value)}
                                required
                            />
                            <TextField
                                id="emergency-response-team-email"
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={emergencyResponseTeamEmail}
                                onChange={(e) => setEmergencyResponseTeamEmail(e.target.value)}
                                required
                            />
                        </div>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button onClick={handleBack} sx={{ mr: 1 }}>
                                Back
                            </Button>
                            <Button onClick={handleNext} variant="contained">
                                Next
                            </Button>
                        </Box>
                    </>
                )}
                {currentStep === 3 && (
                    <>
                        <InputLabel>Issue Warning</InputLabel>

                        <WarningList onItemsChange={handleItemsChange} />
                        <div>
                            <h2>Items from Child Component:</h2>
                            <ul>
                                {itemsFromChild.map((item, index) => (
                                    <li key={index}>{item.message} - {item.severity}</li>
                                ))}
                            </ul>
                        </div>                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button onClick={handleBack} sx={{ mr: 1 }}>
                                Back
                            </Button>
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        </Box>
                    </>

                )}


            </Box>

        </Modal>
    );
}

export default UpdateMunicipalityModal;