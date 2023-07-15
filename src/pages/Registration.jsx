import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

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

    const [errorMessage, setErrorMessage] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => { //handles the submit button
        e.preventDefault(); //prevents the default form submission behavior, which would cause the page to refresh.
        try {
          // Make the API request to register the user
      await axios.post("http://localhost:8800/backend/auth/register", inputs);
      navigate("/");

          
        } catch (errorMessage) {
           setErrorMessage(errorMessage.response.data);
            }
          };

    

  return (
    <div className='form'>
      <h1>Register Here</h1>
      <input type='text' placeholder='First name' onChange={handleChange} name="firstName" />
            <input type='text' placeholder='Last name' onChange={handleChange} name="lastName" />
            <input type='email' placeholder='Email' onChange={handleChange} name="email" />
            <input type='text' placeholder='Username' onChange={handleChange} name="username" />
            <input
                 type="password"
                placeholder="Password"
                onChange={handleChange}
                name="password"
            />
                <input
                 type="password"
                 placeholder="Re-enter Password"
                onChange={handleChange}
                name="reEnterPassword"
            />
            <input type='tel' placeholder='Phone Number' onChange={handleChange} name="phoneNumber" />
            <button onClick={handleClick}>Submit</button>
            {errorMessage && errorMessage}
    </div>
  );
}

export default Registration;