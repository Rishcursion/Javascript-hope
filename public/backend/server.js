//Defining Dependencies
//Used for hashing passwords
const bcrypt = require("bcrypt");
//Used for starting server
const express = require("express");
//Used to query paths for project file
const path = require("path");
//Used to send and recieve data
const bodyparser = require("body-parser");
//Helps with mysql connectivity
const knex = require("knex");
const { password } = require("pg/lib/defaults");

/