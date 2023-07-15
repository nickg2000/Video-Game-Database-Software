import axios from "axios";
import React, { useState } from 'react';
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate()

    

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const {login} = useContext(AuthContext);


    const handleClick = async (e) => { //handles the submit button
        e.preventDefault(); //prevents the default form submission behavior, which would cause the page to refresh.
        try {
          // Make the API request to register the user
      await axios.post("http://localhost:8800/backend/auth/login", inputs);

      navigate("/")
      
    

          
        } catch (errorMessage) {
       // } catch (error) {
           setErrorMessage(errorMessage.response.data);
           console.log("An error occurred:", errorMessage.response.data);
            }
          };


  return (
    <div className='form'>
      <h1>Login</h1>
      
            <input type='text' placeholder='Username' onChange={handleChange} name="username" />
            <input type='password' placeholder='Password' onChange={handleChange} name="password" />
            <button onClick={handleClick}>Login</button>
            {errorMessage && errorMessage}
    </div>
  );
}

export default Login;