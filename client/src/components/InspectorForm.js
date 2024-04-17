import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper, Typography } from '@mui/material';

function InspectorForm() {
    const [inspector, setInspector] = useState('');
    const [checkpoint, setCheckpoint] = useState('');

    const handleInspectorChange = (event) => {
        setInspector(event.target.value);
    };

    const handleCheckpointChange = (event) => {
        setCheckpoint(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you could add logic to submit these values to a backend service
        console.log('Submitting', { inspector, checkpoint });
    };

    return (
        <Paper className="inspector-form-container" elevation={0}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Authorized Inspector"
                    variant="outlined"
                    fullWidth
                    value={inspector}
                    onChange={handleInspectorChange}
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Checkpoint</InputLabel>
                    <Select
                        value={checkpoint}
                        label="Checkpoint"
                        onChange={handleCheckpointChange}
                    >
                        <MenuItem value="Checkpoint 1">Checkpoint 1</MenuItem>
                        <MenuItem value="Checkpoint 2">Checkpoint 2</MenuItem>
                        <MenuItem value="Checkpoint 3">Checkpoint 3</MenuItem>
                        {/* Add more options here as needed */}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </form>
        </Paper>
    );
}

export default InspectorForm;
