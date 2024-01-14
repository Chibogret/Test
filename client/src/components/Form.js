import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

function MaterialForm({ onToggleForm, formType, handleSubmit, email, setEmail, password, setPassword, isLoading }) {
    
    console.log("form type" + formType)

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Validation
    const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$");

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!emailRegex.test(value)) {
            setEmailError('Invalid email format');
            setIsEmailValid(false);
        } else {
            setEmailError('');
            setIsEmailValid(true);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value.length <= 5) {
            setPasswordError('Password must be more than 5 characters');
            setIsPasswordValid(false);
        } else {
            setPasswordError('');
            setIsPasswordValid(true);
        }
    };

    const toggleForm = () => {
        onToggleForm(); // Use onToggleForm passed as prop
    };
    // Styles
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
                    marginBottom: '10px',
                    fontWeight: 'bold',
                }}
            >
                {formType === 'Login' ? 'Login to your account' : 'Create your account'}
            </Box>

            <TextField
                label="Email"
                placeholder="Enter your email"
                type="email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                margin="normal"
                InputLabelProps={textFieldStyles.label}
                InputProps={{
                    ...textFieldStyles.input,
                    inputProps: {
                        pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                    },
                }}
                error={!!emailError}
                helperText={emailError}
                fullWidth
            />

            <TextField
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                margin="normal"
                InputLabelProps={textFieldStyles.label}
                InputProps={textFieldStyles.input}
                error={!!passwordError}
                helperText={passwordError}
                fullWidth
            />

            <Button type="submit" variant="contained" color="primary"
                style={{ width: "100%", marginTop: "15px" }}
                disabled={isLoading || !isEmailValid || !isPasswordValid || emailError || passwordError}>
                {isLoading ? <CircularProgress size={24} /> : formType === 'Login' ? "Login" : 'Register'}
            </Button>

            
            <Button color="primary" style={{ width: "100%", marginTop: "15px", fontSize: "10px" }}
                    onClick={toggleForm}>
                {formType === 'Login' ? "Don't have an account? Register here." : 'Already have an account? Login here.'}
            </Button>
        </form>
    );
}

export default MaterialForm;
