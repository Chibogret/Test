import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MaterialForm from '../components/Form';
import { AuthContext } from '../auth/AuthProvider'; // Assuming this is the path to your AuthContext
import '../styles.css';

function Login({ onToggleForm }) {
    const { login } = useContext(AuthContext); // Use the login function from AuthContext
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const IP_ADR = process.env.REACT_APP_IP_ADR;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`http://${IP_ADR}:5000/api/auth/login`, { email, password });

            // Assuming the response includes the token and user data
            const { token, userData } = response.data;
            localStorage.setItem('token', token); // Store the token
            login(userData, token); // Update the authentication state

            setErrorMessage('Login successful.');
            setOpenSnackbar(true);
            navigate('/home'); // Redirect to the profile page
        } catch (error) {
            setErrorMessage(error.response?.data.message || 'Login failed. Please try again.');
            setOpenSnackbar(true);
        } finally {
            setIsLoading(false);
        }
    };

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
                onToggleForm={onToggleForm}
                formType={'Login'}
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
