import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    // Check if the user exists
    console.log('Register endpoint called');
  
    const checkQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkQuery, [req.body.username], (checkErr, checkData) => {
      if (checkErr) {
        console.error(checkErr); // Log the error for debugging purposes
        return res.status(500).json("Internal Server Error");
      }
      if (checkData.length) {
        return res.status(409).json("User already exists!");
      }
  
      // Creates new user
      try {
        // Hashes password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  
        const insertQuery =
          "INSERT INTO users (`firstName`, `lastName`, `email`, `username`, `password`, `phoneNumber`) VALUES (?)";
  
        const values = [
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.username,
          hashedPassword,
          req.body.phoneNumber,
        ];
  
        db.query(insertQuery, [values], (insertErr, insertData) => {
          if (insertErr) {
            console.error(insertErr); // Log the error for debugging purposes
            return res.status(500).json("Internal Server Error");
          }
          return res.status(200).json("User has been created.");
        });
      } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json("Internal Server Error");
      }
    });
  };

  export const login = (req, res) => {
    // TODO: Implement login functionality
  
    const checkQuery = "SELECT * FROM users WHERE username = ?";
  
    db.query(checkQuery, [req.body.username], (checkErr, checkData) => {
      console.log('Login query executed'); // Log that the query is executed
  
      if (checkErr) {
        console.error(checkErr); // Log the error for debugging purposes
        return res.status(500).json("Internal Server Error");
      }
      console.log('Query data:', checkData); // Log the query results
  
      if (checkData.length === 0) {
        return res.status(409).json("User not found!");
      }
  
      const checkPassword = bcrypt.compareSync(req.body.password, checkData[0].password);
  
      if (!checkPassword) return res.status(400).json("Wrong password or username");
  
      const token = jwt.sign({ id: checkData[0].id }, "secretkey");
  
      const { password, ...others } = checkData[0];
  
      res.cookie("accessToken", token, {
        httpOnly: true,
      }).status(200).json({message: "Login successful"});
    });
  };
  
  

  export const logout = (req, res) => {
    // TODO: Implement logout functionality

    res.clearCookie("accessToken", {
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been logged out.")
  };