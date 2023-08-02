import axios from "axios";
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../context/authContext";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook


const Login = () => {
  const { login, errorMessage, setErrorMessage } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    // Clear the error message when the component mounts or the inputs change
    setErrorMessage(null);
  }, [inputs, setErrorMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputs);
  };

  return (
    <div>
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            onChange={handleChange}
            name="username"
          />
          <br /> {"       "}
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
          />
          <br /> {"      "}
          <button type="submit">Login</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;