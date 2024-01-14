import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MaterialForm from '../components/Form'; // Assume LoginForm is similar to RegistrationForm but for login
import '../styles.css';

function Login({ onToggleForm }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const IP_ADR = process.env.REACT_APP_IP_ADR;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`http://${IP_ADR}:5000/api/auth/login`, { email, password });
            // const response = await axios.post(`http://${IP_ADR}:5000/api/auth/login`, { email, password });
            
            // Handle login success, e.g., redirect, store tokens, etc.
            setErrorMessage('Login successful.');
            setOpenSnackbar(true);
            // Redirect or further actions here
        } catch (error) {
            setErrorMessage(error.response.data.message || 'Login failed. Please try again.');
            setOpenSnackbar(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="registration-form-container">
            <MaterialForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isLoading={isLoading}
                onToggleForm={onToggleForm} // Pass the onToggleForm to MaterialForm
                formType={'Login'} // Pass the formType to MaterialForm
                // Remove formType if it's not used
            />
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={errorMessage.startsWith('Login successful') ? "success" : "error"}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;
