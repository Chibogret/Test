import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';

function InspectorForm({ onInspectorChange, onCheckpointChange, checkpointList = [], selectedCheckpoint }) {
    const [inspector, setInspector] = useState('');
    const [checkpoint, setCheckpoint] = useState('');

    useEffect(() => {
        // Update the checkpoint when the selectedCheckpoint prop changes
        if (selectedCheckpoint) {
            setCheckpoint(selectedCheckpoint);
        } else if (checkpointList.length > 0) {
            setCheckpoint(checkpointList[0].id); // Default to the first checkpoint
        }
    }, [selectedCheckpoint, checkpointList]);

    const handleInspectorChange = (event) => {
        const newInspector = event.target.value;
        setInspector(newInspector);
        onInspectorChange(newInspector);
    };

    const handleCheckpointChange = (event) => {
        const newCheckpoint = event.target.value;
        console.log(checkpoint)
        setCheckpoint(newCheckpoint);
        onCheckpointChange(newCheckpoint); // Notify the parent component of the change
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting', { inspector, checkpoint });
        // Example: onFormSubmit({ inspector, checkpoint }); // Handle the form submission in the parent component if needed
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
                <FormControl fullWidth margin="normal" disabled={checkpointList.length === 0}>
                    <InputLabel>Checkpoint</InputLabel>
                    <Select
                        style={{textAlign:"left"}}
                        value={checkpoint}
                        label="Checkpoint"
                        onChange={handleCheckpointChange}
                    >
                        {checkpointList.map((checkpointItem) => {
                            console.log(checkpointItem._id); // Check the uniqueness of each ID in the console
                            return (
                                <MenuItem key={checkpointItem._id} value={checkpointItem.name}>
                                    {checkpointItem.name}
                                </MenuItem>
                            );
                        })}

                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={checkpointList.length === 0}>
                    Submit
                </Button>
            </form>
        </Paper>
    );
}

export default InspectorForm;
