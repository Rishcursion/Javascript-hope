//Dependencies
const express = require("express");
const mariadb = require("mariadb");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcrypt");
const http = require("http");
const bodyParser = require("body-parser");
const validator = require("express-validator");
const session = require("express-session");

//setting up connection to mariadb using env variable
dotenv.config();
const pool = mariadb.createPool({
  host: process.env.DATABASE_HOST,
  port: 3306,
  user: process.env.DATABASE_ROOT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 2,
});

//initializing express.js and port for live server
const app = express();
const port = 3000;

//setting up express.js
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

//setting up GET requests
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/landingpage.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/login.html"));
});
app.get("/login/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/register.html"));
});
app.get("/login/homepage", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/homepage.html"));
});
app.get("/userdetails", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/userdetails.html"));
});

//setting up POST requests
app.post("/login", async (req, res) => {
  let username = req.body.Username;
  let password = req.body.pass;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM User WHERE username = ?", [
      username,
    ]);
    conn.release();

    if (result.length > 0) {
      const user = result[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect("/login/homepage");
      } else {
        res.status(401).send("Incorrect password");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login/register", async (req, res) => {
  let username = req.body.user;
  let email = req.body.email;
  let password = req.body.pass;
  let confirmPassword = req.body.repass;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO User (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    conn.release();
    res.redirect("/userdetails");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/userdetails", async (req, res) => {
  let username = req.body.Username;
  let user_name = req.body.name;
  let user_age = req.body.age;
  let user_gender = req.body.gender;
  let user_height = req.body.height;
  let user_weight = req.body.weight;
  let user_waist_size = req.body.waist_size;
  let user_neck_size = req.body.neck_size;
  try {
    const conn = await pool.getConnection();
    const userQuery = "SELECT uuid FROM User WHERE username = ?";
    const userResult = await conn.query(userQuery, [username]);
    conn.release();
    if (userResult.length > 0) {
      const user_id = userResult[0].uuid;

      try {
        const conn2 = await pool.getConnection();
        const insertQuery =
          "INSERT INTO user_data  VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        await conn2.query(insertQuery, [
          user_id,
          user_name,
          user_gender,
          user_age,
          user_weight,
          user_height,
          user_neck_size,
          user_waist_size,
        ]);
        conn2.release();

        res.redirect("/login/homepage");
      } catch (err) {
        console.error(err);
        res.status(404).send("Forbidden");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(port, () => console.log(`Listening on port: ${port}`));
