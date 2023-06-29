import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"TestP@ssw0rd",
    database: "videogamedatabase"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/videogames", (req,res)=>{
    const q = "SELECT * FROM videogames"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)

        const formattedData = data.map((videogame) => {
            const formattedReleaseDate = new Date(videogame.release_date).toLocaleDateString("en-US");
            return { ...videogame, release_date: formattedReleaseDate };
          });

        return res.json(formattedData)
    })

})

app.post("/videogames", (req,res)=>{
    const q = "INSERT INTO videogames (`title`, `genre`, `developer`, `platform`, `release_date`, `image`, `price`) VALUES (?)"
    const values = [
                    req.body.title, 
                    req.body.genre, 
                    req.body.developer,
                    req.body.platform,
                    req.body.release_date,
                    req.body.image,
                    req.body.price 
                ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Video game has been created succesfully")
    })
})

app.delete("/videogames/:id", (req,res)=>{
    const videogameId = req.params.id;
    const q = "DELETE FROM videogames WHERE id = ?"

    db.query(q,[videogameId], (err,data)=> {
        if (err) return res.json(err);
        return res.json("Video game has been deleted!")
    })

    
})

/*
app.put("/videogames/:id", (req,res)=>{
    const videogameId = req.params.id;
    const q = "UPDATE videogames SET `title` = ?, `genre` = ?, `developer` = ?, `platform` = ?, `release_date` = ?, `image` = ?, `price` = ? WHERE id=?";

    const values=[
                    req.body.title, 
                    req.body.genre, 
                    req.body.developer,
                    req.body.platform,
                    req.body.release_date,
                    req.body.image,
                    req.body.price 

    ]


    db.query(q,[...values,videogameId], (err,data)=> {
        if (err) return res.json(err);
        return res.json("Video game has been updated!")
    })

    
})

*/

app.put("/videogames/:id", (req, res) => {
  const videogameId = req.params.id;
  const updateFields = req.body;
  let q = "UPDATE videogames SET ";

  const values = [];
  Object.keys(updateFields).forEach((key, index) => {
    if (updateFields[key] !== "") {
      q += "`" + key + "` = ?, ";
      values.push(updateFields[key]);
    }
  });

  q = q.slice(0, -2); // Remove the trailing comma and space
  q += " WHERE id = ?"; // Add the WHERE condition for the video game ID
  values.push(videogameId);

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Video game has been updated!");
  });
});

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})
