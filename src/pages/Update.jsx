import axios from "axios";
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import the useNavigate hook

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
    

    const navigate = useNavigate()
    const location = useLocation()

    const videogameId = location.pathname.split("/")[2]



    const handleChange = (e) => {
        const { name, value } = e.target;
          // Convert the input date to YYYY-MM-DD format
  if (name === "release_date") {
    const parts = value.split("/");
    const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;
    setVideogame((prevVideogame) => ({ ...prevVideogame, [name]: formattedDate }));
  } else {
    setVideogame((prevVideogame) => ({ ...prevVideogame, [name]: value }));
  }
};

        

    /*
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8800/videogames/"+ videogameId, videogame);
            // Handle successful submission (e.g., redirect, display success message)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    };
*/

const handleClick = async (e) => {
    e.preventDefault();
    console.log("Clicked the Update button"); // Add a log message to indicate the button click
    console.log("videogameId:", videogameId); // Log the value of videogameId
    console.log("videogame:", videogame); // Log the value of videogame

    try {
        await axios.put("http://localhost:8800/videogames/" + videogameId, videogame);
        console.log("Update request sent"); // Log a message after the update request is sent
        navigate("/");
    } catch (err) {
        console.log("Error:", err); // Log the error message if the update request fails
    }
};
    
    return (
        <div className='form'>
            <h1> Update Video Game Info</h1>
            <input type='text' placeholder='title' onChange={handleChange} name="title" />
            <input type='text' placeholder='genre' onChange={handleChange} name="genre" />
            <input type='text' placeholder='developer' onChange={handleChange} name="developer" />
            <input type='text' placeholder='platform' onChange={handleChange} name="platform" />
            <input type='text' placeholder='release_date' onChange={handleChange} name="release_date" />
            <input type='number' placeholder='price' onChange={handleChange} name="price" />
            <input type='text' placeholder='image' onChange={handleChange} name="image" />

            <button onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update;