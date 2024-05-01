import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import Login from '../components/LoginForm';
import Register from '../components/RegisterForm';

function FormContainer() {
  const [currentForm, setCurrentForm] = useState('login');
  const { formType } = useParams(); // Get the formType from the URL

  // Set the currentForm based on the formType from the URL
  useEffect(() => {
    console.log(formType)
    if (formType === 'login' || formType === 'register') {
      setCurrentForm(formType);
    }
  }, [formType]);

  const toggleForm = () => {
    setCurrentForm(currentForm === 'login' ? 'register' : 'login');
  };

  return (
    <div style={{ width: "300px", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '6px' }}>
    {currentForm === 'login' ? (
        <Login onToggleForm={toggleForm} formType={currentForm} />
      ) : (
        <Register onToggleForm={toggleForm} formType={currentForm}/>
      )}
    </div>
  );
}

export default FormContainer;
