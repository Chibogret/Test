import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Box,
  Button,
  Container,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import '../css/bucketlist.css'

const API_IP = process.env.REACT_APP_API_IP;
const API_PORT = process.env.REACT_APP_API_PORT;


const BucketList = () => {
  const [bucketList, setBucketList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchBucketList();
  }, []);

  const fetchBucketList = async () => {
    try {
      const response = await axios.get(`http://${API_IP}:${API_PORT}/api/bucketlist`);
      setBucketList(response.data);
    } catch (error) {
      console.error('Error fetching bucket list:', error);
    }
  };

  const handleAddItem = async () => {
    if (inputValue.trim()) {
      try {
        const response = await axios.post(`http://${API_IP}:${API_PORT}/api/bucketlist`, {
          text: inputValue,
          completed: false,
        });
        setBucketList([...bucketList, response.data]);
        setInputValue('');
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  const handleToggleComplete = async (index) => {
    const item = bucketList[index];
    try {
      const response = await axios.patch(`http://${API_IP}:${API_PORT}/api/bucketlist/${item._id}`, {
        completed: !item.completed,
      });
      const newBucketList = [...bucketList];
      newBucketList[index] = response.data;
      setBucketList(newBucketList);
    } catch (error) {
      console.error('Error toggling item completion:', error);
    }
  };

  const handleDeleteItem = async (index) => {
    const item = bucketList[index];
    try {
      await axios.delete(`http://${API_IP}:${API_PORT}/api/bucketlist/${item._id}`);
      const newBucketList = bucketList.filter((_, i) => i !== index);
      setBucketList(newBucketList);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4, backgroundColor: '#ffe4e1', position: 'relative' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom color="#A87676">
          📝 Our Bucket List
        </Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new item..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ backgroundColor: '#ffffff', borderRadius: '4px' }}
          />
          <IconButton color="primary" onClick={handleAddItem}>
            <AddCircleIcon />
          </IconButton>
        </Box>
   
        <List className='container'  sx={{ maxHeight: 250, overflow: 'auto' }}>
          {bucketList.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                textDecoration: item.completed ? 'line-through' : 'none',
                backgroundColor: '#fff7f7',
                borderRadius: '4px',
                mb: 1,
              }}
            >
              <Checkbox
                checked={item.completed}
                onChange={() => handleToggleComplete(index)}
                sx={{ color: '#ff8a80' }}
              />
              <ListItemText primary={item.text} style={{color:"#A87676"}}/>
              <IconButton edge="end" color="secondary" onClick={() => handleDeleteItem(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
};

export default BucketList;
