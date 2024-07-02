import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/messages.css'; // Import the custom CSS file

const API_IP = process.env.REACT_APP_API_IP;
const API_PORT = process.env.REACT_APP_API_PORT;

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://${API_IP}:${API_PORT}/api/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') {
      return; // Prevent submitting empty messages
    }
    try {
      const response = await axios.post(`http://${API_IP}:${API_PORT}/api/messages`, { text: newMessage });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    autoplaySpeed: 5000,
    // cssEase: 'linear',
  };

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', backgroundColor: "#A87676" }}
    >
      •
    </Box>
  );

  return (
    <Box sx={{ my: 2 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2, width: "100%" }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "80%" }}>
          <TextField
            label="New Message"
            variant="outlined"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Message
          </Button>
        </Box>
      </Box>

      <Slider {...settings} className="slider-container">
        {messages.map((message, index) => (
          <Card key={index} className='message-card' style={{ borderRadius: '25px', fontFamily: 'Pacifico, cursive' }}>
            <CardContent style={{ height: "200px" }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Message of the Day
              </Typography>
              <Typography variant="body2" color="black">
                {message.text}
              </Typography>
            </CardContent>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
              {new Date(message.createdAt).toLocaleString()}
            </Typography>
          </Card>
        ))}
      </Slider>

    </Box>
  );
};

export default Messages;
