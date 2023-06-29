import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Registration = () => {
    const [videogame, setVideogame] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        phoneNumber: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setVideogame((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/videogames", videogame);
            // Handle successful submission (e.g., redirect, display success message)
            navigate("/");
        } catch (err) {
            console.log(err);
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
            <input type='tel' placeholder='Phone Number' onChange={handleChange} name="phoneNumber" />
            <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Registration;