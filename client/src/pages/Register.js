import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MaterialForm from '../components/RegistrationForm';
import '../styles.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const IP_ADR = process.env.REACT_APP_IP_ADR || 'localhost';
    console.log(IP_ADR)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://${IP_ADR}:5000/api/auth/register`, { username, password });
            console.log(response.data);
            // Reset error message on successful registration
            setErrorMessage('Registration successful. Please login.');
            setOpenSnackbar(true); // Display success snackbar
        } catch (error) {
            console.error(error);
            // Set error message on failure
            setErrorMessage('Registration failed. Please try again.');
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div>
            <div className="registration-form-container">
                <MaterialForm
                    handleSubmit={handleSubmit}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                />
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Position the Snackbar at the bottom-right
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {errorMessage && <div>{errorMessage}</div>}
                </Alert>
            </Snackbar>

        </div>
    );
}

export default Register;
