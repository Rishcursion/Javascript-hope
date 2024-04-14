//Setting Up Imports required for initializing the express application
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const loginroutes = require("../Javascript-hope/routes/login");
const registerroutes = require("../Javascript-hope/routes/register");
const app = express();
dotenv.config();
const ea = process.env;
const PORT = ea.PORT;

//setting up database connection

//Using pug to serve html files to frontnd from backend
app.set("view engine", "pug");

//setting up app parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", loginroutes);
app.use("/", registerroutes);
app.listen(PORT, () => console.log(`Listening For Requests On Port: ${PORT}`));
