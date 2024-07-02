import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const Horoscope = () => {
  const horoscopes = [
    { name: 'Taurus', icon: '/taurus.png' },
    { name: 'Leo', icon: '/leo.png' },
  ];

  const [currentHoroscope, setCurrentHoroscope] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHoroscope((prev) => (prev + 1) % horoscopes.length);
    }, 3000); // Change horoscope every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      flexDirection="column" 
      bgcolor="wjote" // Change color to a light grey
      padding={2}
    margin={3}
      borderRadius="16px"
      border="none"
    >
      <Avatar 
        src={horoscopes[currentHoroscope].icon} 
        style={{ width: 150, height: "fit-content", borderRadius: '50%', padding: "10px" }}
      />
    </Box>
  );
};

export default Horoscope;
