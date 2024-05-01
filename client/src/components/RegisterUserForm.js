import React from 'react';
import { Modal, Button } from '@mui/material';
import Register from './RegisterForm';

function RegisterUserForm({ openU, handleUserClose }) {
    return (
        <Modal
            open={openU}
            onClose={handleUserClose}
            aria-labelledby="shipment-tracking-modal-title"
            aria-describedby="shipment-tracking-modal-description"
        >
            <div style={{ width: "300px", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '6px', border: '1px bla' }}>

                <Register formType='Register'/>
                
            </div>
        </Modal>
    );
}

export default RegisterUserForm;
