import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';

function InspectorForm({ onInspectorChange, onCheckpointChange, checkpointList = [], selectedCheckpoint }) {
    const [inspector, setInspector] = useState('');
    const [checkpoint, setCheckpoint] = useState('');

    useEffect(() => {
        if (selectedCheckpoint) {
            setCheckpoint(selectedCheckpoint.name); // Assuming selectedCheckpoint is an object with a name
        } else if (checkpointList.length > 0) {
            setCheckpoint(checkpointList[0].name); // Use name instead of id
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


    return (
        <Paper className="inspector-form-container" elevation={0}>

            <TextField
                label="Authorized Inspector"
                variant="outlined"
                fullWidth
                value={inspector}
                onChange={handleInspectorChange}
                margin="normal"
            />
            <FormControl fullWidth style={{marginBottom:"15px"}} disabled={checkpointList.length === 0}>
                <InputLabel>Checkpoint</InputLabel>
                <Select
                    style={{ textAlign: "left" }}
                    value={checkpoint}
                    label="Checkpoint"
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
            </FormControl>

        </Paper>
    );
}

export default InspectorForm;
