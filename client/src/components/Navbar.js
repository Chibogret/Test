import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useMediaQuery, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon

function Navbar() {
    const toggleSidebar = () => {
        document.querySelector('.home-tracklist').classList.toggle('active');
    };

    // // Using useMediaQuery hook to check for screen width
    // const matches = useMediaQuery('(max-width:768px)');

    return (
        <AppBar position="fixed" className='app-bar'>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <div className='hide-tracklist'>
                        <IconButton onClick={toggleSidebar} aria-label="toggle sidebar">
                            <MenuIcon sx={{ color: 'white' }} /> {/* Set the icon color to white */}
                        </IconButton>
                    </div>
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
