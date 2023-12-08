import React from 'react';
import { TextField, Button, Box, Container } from '@mui/material';

function MaterialForm({ handleSubmit, username, setUsername, password, setPassword }) {
    // Common styles for TextFields
    const textFieldStyles = {
        label: {
            sx: {
                color: 'primary',
                textTransform: 'capitalize',
            },
            style: { color: 'primary' },
            shrink: true,
        },
        input: {
            sx: {
                '& .MuiInputBase-input': {
                    padding: 1, // Removes padding
                    '&:hover fieldset': {
                        border: '1px solid primary!important',
                    },
                    '&:focus-within fieldset, &:focus-visible fieldset': {
                        border: '2px solid primary!important',
                    },
                },
            },
        },
    };

    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off" className='registration-form'>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                   
                }}
            >
                
            Welcome
            <img style={{width: '150px'}}
                src={
                    process.env.PUBLIC_URL + "/logo.png"
                }
            />
            </Box>
            <TextField
                label="Email"
                placeholder="Enter your email"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                InputLabelProps={textFieldStyles.label}
                InputProps={textFieldStyles.input}
                fullWidth
            />
            <TextField
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputLabelProps={textFieldStyles.label}
                InputProps={textFieldStyles.input}
                fullWidth
            />

            <Button type="submit" variant="contained" color="primary" style={{width:"100%", marginTop:"15px"}}>
                Register
            </Button>
           
        </form>
    );
}

export default MaterialForm;
