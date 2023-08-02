import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [videogame, setVideogame] = useState({
    title: "",
    genre: "",
    developer: "",
    platform: "",
    release_date: "",
    image: "",
    price: null,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const videogameId = location.pathname.split("/")[2];
  const [errorMessage, setErrorMessage] = useState(null);

  const formatDateForInput = (dateString) => {
    // Parse the date in the format "YYYY-MM-DD" and convert to "MM/DD/YYYY"
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "release_date") {
      // Check if the date is valid and not in the future
      const parsedDate = new Date(value);
      const isValidDate = !isNaN(parsedDate) && parsedDate <= new Date();
  
      setErrorMessage(
        isValidDate
          ? null
          : "Invalid Date. Please use a valid date in the format MM/DD/YYYY and not in the future."
      );
  
      // Set the date value directly without converting format
      setVideogame((prevVideogame) => ({
        ...prevVideogame,
        [name]: value,
      }));
    } else {
      setVideogame((prevVideogame) => ({ ...prevVideogame, [name]: value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (errorMessage) {
      // If there's an error message, do not proceed with the update
      return;
    }

    try {
      await axios.put("http://localhost:8800/videogames/" + videogameId, videogame);
      navigate("/");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="form">
      <h1> Update Video Game Info</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title" />
      <input type="text" placeholder="genre" onChange={handleChange} name="genre" />
      <input type="text" placeholder="developer" onChange={handleChange} name="developer" />
      <input type="text" placeholder="platform" onChange={handleChange} name="platform" />
      <input
        type="date"
        id="release_date"
        name="release_date"
        value={videogame.release_date}
        onChange={handleChange}
        max={new Date().toISOString().split("T")[0]}
        required
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <input type="number" placeholder="price" onChange={handleChange} name="price" />
      <input type="text" placeholder="image" onChange={handleChange} name="image" />
      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;