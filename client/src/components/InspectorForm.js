import React, { useState, useEffect } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import axios from 'axios'; // Ensure axios is installed


function InspectorForm({ onHeadChange, onInspectorChange, onCheckpointChange, checkpointList = [], selectedCheckpoint }) {
    const [inspector, setInspector] = useState('');
    const [checkpoint, setCheckpoint] = useState('');
    const [heads, setHeads] = useState('');
    const IP_ADR = process.env.REACT_APP_IP_ADR;

    useEffect(() => {
        if (selectedCheckpoint) {
            setCheckpoint(selectedCheckpoint.name);
        } else if (checkpointList.length > 0) {
            setCheckpoint(checkpointList[0].name);
        }
        fetchInspectorData();
    }, [selectedCheckpoint, checkpointList]);

    useEffect(() => {
        onInspectorChange(inspector);
    }, [inspector, onInspectorChange]);

    useEffect(() => {
        onCheckpointChange(checkpoint);
    }, [checkpoint, onCheckpointChange]);

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
            setCheckpoint(municipality);
        } catch (error) {
            console.error('Failed to fetch inspector data:', error);
        }
    };

    const toTitleCase = (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const handleHeadChange = (event) => {
        const newHeads = event.target.value;
        setHeads(newHeads);
        onHeadChange(newHeads);
    };

    return (
        <Paper className="inspector-form-container" elevation={0}>
            <TextField
                style={{ marginBottom: "15px" }}
                label="Authorized Inspector"
                variant="outlined"
                fullWidth
                value={inspector}
                InputProps={{ readOnly: true }}
                disabled
            />
            <TextField
                style={{ marginBottom: "15px" }}
                label="Checkpoint"
                variant="outlined"
                fullWidth
                value={checkpoint}
                InputProps={{ readOnly: true }}
                disabled
            />
            <TextField
                style={{ marginBottom: "15px" }}
                label="Number of Heads"
                variant="outlined"
                fullWidth
                type="number"
                value={heads}
                onChange={handleHeadChange}
            />
        </Paper>
    );
}
            {/* <FormControl fullWidth style={{ marginBottom: "15px" }} disabled={checkpointList.length === 0}>
                <InputLabel>Municipality</InputLabel>
                <Select
                    value={checkpoint}
                    label="Municipality"
                    onChange={handleCheckpointChange}
                >
                    {checkpointList.filter(checkpointItem =>
                        checkpointItem.status !== "completed" && checkpointItem.status !== "completed (skipped)")
                        .map(checkpointItem => (
                            <MenuItem key={checkpointItem._id} value={checkpointItem.name}>
                                {checkpointItem.name}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl> */}

export default InspectorForm;
