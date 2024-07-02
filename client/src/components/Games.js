import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Card, CardContent, CardActions } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/messages.css'; // Import the custom CSS file
import PicturePuzzle from './PicturePuzzle';
import TicTacToe from './TicTacToe';
import Flames from './Flames';

const Games = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/messages');
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
      const response = await axios.post('http://localhost:5000/api/messages', { text: newMessage });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 10000,
//     slidesToShow: 2,
//     autoplay: true,
//     autoplaySpeed: 1,
//     cssEase: 'linear',
//   };

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,

  };
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  return (
    <Box sx={{ my: 2 }}>
      {/* <Typography variant="h4" gutterBottom>Love Messages</Typography> */}
      {/* <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="New Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit">Send</Button>
      </Box> */}
      <Slider {...settings} className="slider-container">
        {/* {messages.map((message, index) => (
          <Card key={index} variant="outlined" className='message-card' style={{ borderRadius: '25px'}}>
            <CardContent style={{ height: "200px" }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Message of the Day
              </Typography>
              <Typography variant="body2">
                {message.text}
              </Typography>
            </CardContent>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
              {new Date(message.createdAt).toLocaleString()}
            </Typography>
          </Card>
        ))} */}
                        <PicturePuzzle imageSrc="puzzle.jpg" gridSize={4} />
                        <TicTacToe />
                        <Flames />


      </Slider>
    </Box>
  );
};

export default Games;
