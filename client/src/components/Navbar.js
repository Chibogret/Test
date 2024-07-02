import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white" }}>
          Nade and Me
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="end" color="inherit">
            <Avatar alt="Deinyel" src={`${process.env.PUBLIC_URL}/dein.png`} />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <Avatar alt="Nade" src={`${process.env.PUBLIC_URL}/nade.png`} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
