const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");
const { stat } = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// get all the favorite cities that are saved for a user
app.get("/api/users", async (req, res) => {
  try {
    const { rows: users } = await db.query("SELECT * FROM users");
    res.json(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// get the weather for any city
app.get("/api/weather", async (req, res) => {
  try {
    const { username, fav_city, state_code } = req.body;
    const apiKey = process.env.API_KEY;
    const q = `${fav_city},${state_code},US`;
    console.log(q);
    const params = new URLSearchParams({
      q,
      appid: apiKey,
      units: "imperial",
    });
    const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

// create the POST request if user says the city is a favorite
app.post("/api/user/fav", async (req, res) => {
  try {
    const { username, fav_city, state_code } = req.body;
    const result = await db.query(
      "INSERT INTO users (username, fav_city, state_code) VALUES($1, $2, $3) RETURNING *",
      [username, fav_city, state_code]
    );

    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for users
app.delete("/api/user/:userId", async (req, res) => {
  try {
    console.log(req.params);
    const userId = req.params.userId;
    await db.query("DELETE FROM users WHERE user_id=$1", [userId]);
    console.log("From the delete request-url", userId);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a user fav city
app.put("/api/contact/:userId", async (req, res) => {
  console.log(req.body);
  const userId = req.params.userId;
  const { username, fav_city, state_code } = req.body;
  console.log("In the server from the url - the contact id", userId);

  const query = `UPDATE users SET username=$1, fav_city=$2, state_code=$3 WHERE user_id=${userId} RETURNING *`;
  const values = [username, fav_city, state_code];
  try {
    const updated = await db.query(query, values);
    res.json(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
