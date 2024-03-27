//Dependencies
const express = require("express");
const mariadb = require("mariadb");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcrypt");
const http = require("http");
const bodyParser = require("body-parser");
const validator = require("express-validator");
//const session = require("express-session");

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
async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();

    const res = await conn.query("INSERT INTO workout_types values (?,?,?,?)", [
      1,
      "Running",
      "Cardio",
      700,
    ]);
    // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } finally {
    if (conn) conn.release(); //release to pool
  }
}
asyncFunction();
//setting up variables
const app = express();
const port = 3000;

//Setting Up An Object for storing user details

//setting up express.js
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

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

//setting up POST requests

app.post("/login", (req, res) => {
  let username = req.body.Username;
  let password = req.body.pass;
});

app.post("/login/register", (req, res) => {
  let use = req.body.user;
  let email = req.body.email;
  let pass = req.body.pass;
  let repass = req.body.repass;
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
