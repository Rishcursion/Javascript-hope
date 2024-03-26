//Dependencies
const express = require("express");
const mariadb = require("mariadb");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcrypt");
const http = require("http");
const bodyParser = require("body-parser");
const validator = require("express-validator");
const { error } = require("console");

//setting up variables
const app = express();
const port = 3000;

//getting db creds from env file:
dotenv.config();

//setting up express.js
app.use(bodyParser.urlencoded({ extended: false }));
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
let  username = req.body.Username;
let  password = req.body.pass;
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
