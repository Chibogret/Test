import React, { useState, useEffect } from 'react';
import { Select, MenuItem, List, ListItem, ListItemText, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Severity } from '../config/municipalitiesConfig';

function WarningList({onItemsChange}) {
    // Initialize the items state from localStorage
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('itemsFromChild');
        return savedItems ? JSON.parse(savedItems) : [];
    });

    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState({ message: '', severity: 'Low' });
    const [editIndex, setEditIndex] = useState(-1);

    // Effect to handle item changes locally and update parent component
    useEffect(() => {
        // Update localStorage with the new items list
        localStorage.setItem('itemsFromChild', JSON.stringify(items));
        // Trigger the callback to inform parent of the change
        onItemsChange(items);
    }, [items, onItemsChange]);


    const handleDialogOpen = (index = -1) => {
        if (index === -1) {
            setCurrentItem({ message: '', severity: 'Low' }); // Default severity when adding new
        } else {
            setCurrentItem(items[index]);
        }
        setEditIndex(index);
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (editIndex === -1) {
            setItems([...items, currentItem]);
        } else {
            const updatedItems = items.map((item, index) => index === editIndex ? currentItem : item);
            setItems(updatedItems);
        }
        handleDialogClose();
    };

    const handleDelete = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    return (
        <>
            <List style={{ overflow: 'auto', maxHeight: '400px' }}>
                {items.map((item, index) => (
                    <ListItem
                        key={index}
                        secondaryAction={
                            <>
                                <IconButton edge="end" onClick={() => handleDialogOpen(index)} aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" onClick={() => handleDelete(index)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText primary={item.message} secondary={`Severity: ${item.severity}`} />
                    </ListItem>
                ))}
            </List>
            <Button fullWidth startIcon={<AddIcon />} onClick={() => handleDialogOpen()} variant="contained">
                Add New Warning
            </Button>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>{editIndex === -1 ? 'Add New Warning' : 'Edit Warning'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="message"
                        label="Warning Message"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentItem.message}
                        onChange={handleChange}
                    />
                    <Select
                        labelId="severity-label"
                        id="severity"
                        name="severity"
                        fullWidth
                        value={currentItem.severity}
                        onChange={handleChange}
                        required
                    >
                        {Object.values(Severity).map((status, index) => (
                            <MenuItem key={index} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default WarningList;
