import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [videogame, setVideogame] = useState({
        title: "",
        genre: "",
        developer: "",
        platform: "",
        release_date: "",
        image: "",
        price: null,
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setVideogame((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        
        if (videogame.release_date > new Date().toISOString().split('T')[0]) {
            setErrorMessage("Invalid Date");
            return;
        }

        try {
            await axios.post("http://localhost:8800/videogames", videogame);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div className='form'>
            <h1> Add New Video Game </h1>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <input type='text' placeholder='title' onChange={handleChange} name="title" />
            <input type='text' placeholder='genre' onChange={handleChange} name="genre" />
            <input type='text' placeholder='developer' onChange={handleChange} name="developer" />
            <input type='text' placeholder='platform' onChange={handleChange} name="platform" />
            <input type="date" id="release_date" name="release_date" value={videogame.release_date} onChange={handleChange} max={new Date().toISOString().split('T')[0]} required />
            <input type='number' placeholder='price' onChange={handleChange} name="price" />
            <input type='text' placeholder='image' onChange={handleChange} name="image" />

            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add;