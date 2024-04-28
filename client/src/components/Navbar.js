import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon
import HomeIcon from '@mui/icons-material/Home'; // Import HomeIcon

import { useLocation, Link } from 'react-router-dom'; // Import useLocation and Link

function Navbar() {
    const location = useLocation(); // Hook to get location object

    const isHome = location.pathname.startsWith('/home');

    // Function to toggle sidebar
    const toggleSidebar = () => {
        document.querySelector('.home-tracklist').classList.toggle('active');
    };

    return (
        <AppBar position="fixed" className='app-bar'>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <div className='hide-tracklist' style={{ display: 'flex', alignItems: 'center' }}>
                        {isHome ? (
                            <IconButton onClick={toggleSidebar} aria-label="toggle sidebar">
                                <MenuIcon sx={{ color: 'white' }} />
                            </IconButton>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}> {/* This ensures the link button aligns to the left */}
                                <Link to="/home" style={{ color: 'inherit' }}>
                                    <IconButton aria-label="home">
                                        <HomeIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </Link>
                            </div>
                        )}
                    </div>
                </Typography>

                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
