import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Login = () => {
    const [videogame, setVideogame] = useState({
        userName: '',
        passWord: '',
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
      
            <input type='text' placeholder='Username' onChange={handleChange} name="username" />
            <input type='password' placeholder='Password' onChange={handleChange} name="password" />
            <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Login;