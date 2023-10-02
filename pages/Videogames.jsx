import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Videogames = () => {
  const [videogames, setVideogames] = useState([]);
  const { user, logout } = useContext(AuthContext);

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
      setVideogames((prevVideogames) => prevVideogames.filter((game) => game.id !== id));
    } catch (err) {
      console.log("Error deleting video game:",err);
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
  };

  return (
    <div>
      {!user.isLoggedIn ? (
        // Render the login and sign-up buttons
        <>
          <button>
            <Link to="/login">Login</Link>
          </button>
          <button>
            <Link to="/registration">Sign Up</Link>
          </button>
        </>
      ) : (
        // Render the user information and sign-out button
        <>
          <div>Welcome, {user.username}!</div>
          <button onClick={handleLogout}>Sign out</button>
        </>
      )}
  
      <h1 className="textColorBlue" >Welcome to the Online Video Game Database!</h1>
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
  
              {/* Conditionally render the Delete and Update buttons */}
              {user.isLoggedIn && (
                <div className="delete" onClick={() => handleDelete(videogame.id)}>
                  <button>Delete</button>
                </div>
              )}
              {user.isLoggedIn && (
                <div className="update">
                  <button>
                    <Link to={`/update/${videogame.id}`}>Update</Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
  
      {user.isLoggedIn && (
        <button>
          <Link to="/add">Insert new video game</Link>
        </button>
      )}
    </div>
  );
};

export default Videogames;