//Defining Dependencies

//Used for starting server
const express = require('express');
//Used to query paths for project file
const path = require('path');
//Used to send and recieve data
const bodyparser = require('body-parser');
//Helps with mysql connectivity
const knex = require('knex');


//starting server with express
const app = express();

//assigning path variable
let initialPath = path.join(__dirname,"public");
app.use(bodyparser.json());
app.use(express.static(initialPath));
app.get('/',(req,res) =>{
    res.sendFile(path.join(initialPath,"index.html"));

})
app.get('')
app.listen(3000,(req,res) =>{

});