import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { keyframes } from '@mui/system';

// Define the keyframes for the beating animation
const beat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

const Flames = () => {
  const [result, setResult] = useState('');
  const [icon, setIcon] = useState(null);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');

  const specialPairs = [
    ['Deinyel', 'Nadeline'],
    ['Deinyel', 'Nade'],
    ['Dein', 'Nade'],
    ['Einon', 'Nadeline'],
    ['Einon', 'Nade'],
    ['Zeus', 'Nadeline'],
    ['Zeus', 'Nade'],
  ];

  const calculateResult = (name1, name2) => {
    const normalizedNames = [name1.toLowerCase(), name2.toLowerCase()];
    const isSpecialPair = specialPairs.some(
      ([specialName1, specialName2]) =>
        (normalizedNames.includes(specialName1.toLowerCase()) &&
        normalizedNames.includes(specialName2.toLowerCase()))
    );

    if (isSpecialPair) {
      setResult('Marriage');
      setIcon(<FavoriteIcon />);
    } else {
      setResult('Friends');
      setIcon(<PeopleIcon />);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h4">
        <LocalFireDepartmentIcon
          sx={{ 
            verticalAlign: 'middle', 
            color: "#fc6c00",
            animation: `${beat} 1s infinite`
          }}
        /> FLAMES <LocalFireDepartmentIcon 
          sx={{ 
            verticalAlign: 'middle', 
            color: "#fc6c00",
            animation: `${beat} 1s infinite`
          }} 
        />
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Enter first name"
          variant="outlined"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          sx={{ width: '200px' }}
        />
        <TextField
          label="Enter second name"
          variant="outlined"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          sx={{ width: '200px' }}
        />
      </Box>
      <Button variant="contained" onClick={() => calculateResult(name1, name2)} sx={{ mt: 2 }} style={{backgroundColor: "#fc6c00"}}>
        Calculate
      </Button>
      {result && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6">{result}</Typography>
          {icon}
        </Box>
      )}
    </Box>
  );
};

export default Flames;
