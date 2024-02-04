import React, { useState } from 'react';
import Login from '../components/LoginForm';
import Register from '../components/RegisterForm';

function FormContainer() {
  const [currentForm, setCurrentForm] = useState('register');

  const toggleForm = () => {
    setCurrentForm(currentForm === 'login' ? 'register' : 'login');
  };

  return (
    <>
      {currentForm === 'register' ? (
        <Login onToggleForm={toggleForm} formType={currentForm} />
      ) : (
        <Register onToggleForm={toggleForm} formType={currentForm}/>
      )}
    </>
  );
}

export default FormContainer;
