import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MaterialForm from './Form';
import '../styles.css';

function Register({ onToggleForm, formType }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const [municipality, setMunicipality] = useState('Calapan'); // Default municipality
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const IP_ADR = process.env.REACT_APP_IP_ADR;

    const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email format');
            setOpenSnackbar(true);
            return;
        }
        setIsLoading(true);
        try {
            await axios.post(`http://${IP_ADR}:5000/api/auth/register`, {
                email,
                password,
                firstName,
                lastName,
                role,
                municipality
            });
            setErrorMessage('Registration successful. Please login.');
            setOpenSnackbar(true);
        } catch (error) {
            if (error.response && error.response.data.message.includes('duplicate key error')) {
                setErrorMessage('Account already registered');
            } else {
                setErrorMessage(error.response.data.message || 'Registration failed. Please try again.');
            }
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
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                role={role}
                setRole={setRole}
                municipality={municipality}
                setMunicipality={setMunicipality}
                isLoading={isLoading}
                formType="Register"
                onToggleForm={onToggleForm}
            />
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={errorMessage.startsWith('Registration successful') ? "success" : "error"}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Register;
