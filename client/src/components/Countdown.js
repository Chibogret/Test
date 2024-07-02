import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Cake as CakeIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

const colors = {
  monthsary: '#A87676',
  nadelineBday: 'white',
  deinyelBday: '#A87676'
};

const Countdown = () => {
  const [timeToMonthsary, setTimeToMonthsary] = useState('');
  const [timeToNadelineBday, setTimeToNadelineBday] = useState('');
  const [timeToDeinyelBday, setTimeToDeinyelBday] = useState('');

  useEffect(() => {
    const updateCounters = () => {
      const now = new Date();
      const nextMonthsary = new Date(now.getFullYear(), now.getMonth(), 15);
      if (now > nextMonthsary) nextMonthsary.setMonth(nextMonthsary.getMonth() + 1);

      const nadelineBday = new Date(now.getFullYear(), 7, 9);
      if (now > nadelineBday) nadelineBday.setFullYear(nadelineBday.getFullYear() + 1);

      const deinyelBday = new Date(now.getFullYear(), 3, 20);
      if (now > deinyelBday) deinyelBday.setFullYear(deinyelBday.getFullYear() + 1);

      setTimeToMonthsary(formatTimeDifference(nextMonthsary));
      setTimeToNadelineBday(formatTimeDifference(nadelineBday));
      setTimeToDeinyelBday(formatTimeDifference(deinyelBday));
    };

    const formatTimeDifference = (date) => {
      const now = new Date();
      const diff = date - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return `${days} days ${hours} hours`;
    };

    updateCounters();
    const interval = setInterval(updateCounters, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
      sx={{
        padding: 3,
        backgroundColor: "none",
        borderRadius: 3,
        textAlign: 'center',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box 
            sx={{
              backgroundColor: colors.monthsary,
              padding: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              color: "white"
            }}
          >
            <FavoriteIcon sx={{ fontSize: 50, color: 'white' }} />
            <Typography variant="h6">Next Monthsary</Typography>
            <Typography variant="body1">{timeToMonthsary}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box 
            sx={{
              backgroundColor: colors.nadelineBday,
              padding: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              color: "#A87676"
            }}
          >
            <CakeIcon sx={{ fontSize: 50, color: '#A87676' }} />
            <Typography variant="h6">Nadeline's Birthday</Typography>
            <Typography variant="body1">{timeToNadelineBday}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box 
            sx={{
              backgroundColor: colors.deinyelBday,
              padding: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              color: "white"
            }}
          >
            <CakeIcon sx={{ fontSize: 50, color: 'white' }} />
            <Typography variant="h6">Deinyel's Birthday</Typography>
            <Typography variant="body1">{timeToDeinyelBday}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Countdown;
