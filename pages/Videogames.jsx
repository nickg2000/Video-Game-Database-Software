import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import axios from 'axios';

const Videogames = () => {
    const [videogames, setVideogames] = useState([]);
  
    useEffect(() => {
      const fetchAllVideogames = async () => {
        try {
          const res = await axios.get("http://localhost:8800/videogames");
          setVideogames(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAllVideogames();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8800/videogames/${id}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div>
        <h1>Welcome to the Online Video Game Database!</h1>
        <div className="videogames">
          {videogames.map((videogame) => (
            <div className="videogame" key={videogame.id}>
              {videogame.image && <img src={videogame.image} alt="" />}
              <div>
                <h2>{videogame.title}</h2>
                <p>{videogame.genre}</p>
                <p>{videogame.developer}</p>
                <p>{videogame.platform}</p>
                <p>{videogame.release_date}</p>
                <span>{videogame.price}</span>
                <div className="delete" onClick={() => handleDelete(videogame.id)}>
                  <button>Delete</button>
                </div>
                <div className="update">
                 <button>
                    <Link to={`/update/${videogame.id}`}>Update</Link>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button>
          <Link to="/add">Add new video game</Link>
        </button>
      </div>
    );
  };
  
  export default Videogames;