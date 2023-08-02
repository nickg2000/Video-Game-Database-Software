import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    reEnterPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate if the password and re-entered password match
    if (inputs.password !== inputs.reEnterPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Password validation rules
    const lengthRegex = /.{8,}/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!lengthRegex.test(inputs.password)) {
      setErrorMessage('Password must be at least 8 characters long.');
    } else if (!numberRegex.test(inputs.password)) {
      setErrorMessage('Password must contain at least one number.');
    } else if (!specialCharRegex.test(inputs.password)) {
      setErrorMessage('Password must contain at least one special character.');
    } else {
      // If the password meets all requirements, proceed with registration
      try {
        // Make the API request to register the user
        await axios.post("http://localhost:8800/backend/auth/register", inputs);
        navigate("/");
      } catch (error) {
        setErrorMessage(error.response.data);
      }
    }
  };

  return (
    <div className='form'>
      <h1>Register Here</h1>
      <input type='text' placeholder='First name' onChange={handleChange} name="firstName" />
      <input type='text' placeholder='Last name' onChange={handleChange} name="lastName" />
      <input type='email' placeholder='Email' onChange={handleChange} name="email" />
      <input type='text' placeholder='Username' onChange={handleChange} name="username" />
      <input type='password' placeholder='Password' onChange={handleChange} name="password" />
      <input type='password' placeholder='Re-enter Password' onChange={handleChange} name="reEnterPassword" />
      <input type='tel' placeholder='Phone Number' onChange={handleChange} name="phoneNumber" />
      <button onClick={handleClick}>Submit</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default Registration; 