//Defining Dependencies
//Used for hashing passwords
const bcrypt = require('bcrypt');
//Used for starting server
const express = require('express');
//Used to query paths for project file
const path = require('path');
//Used to send and recieve data
const bodyparser = require('body-parser');
//Helps with mysql connectivity
const knex = require('knex');
const { password } = require('pg/lib/defaults');

//setting up db connection
const db = knex({
    client:'mariadb',
    user : 'hotstuff',
    password : 'sexy',
    database: 'Workout'

})

const init_id = 1000;
//starting server with express
const app = express();

//assigning path variable
let initialPath = path.join(__dirname,"public/frontend");

app.use(bodyparser.json());
app.use(express.static(initialPath));


app.get('/login',(req,res) =>{
    res.sendFile(path.join(initialPath,"html/login.html"));
})

app.get('/register',(req,res)=>{
    res.sendFile(path.join(initialPath,"html/register.html"));
})

app.post('/register-user',(req,res)=>{
    const {name,email,password,repass} = req.body;
    const id = (init_id + 1)% 1000 +67;
    if(password != repass){
        console.log("Passwords Do Not Match!!");
    }
    else{
        db("Users").insert({
            ID: id,
            name:name,
            email:email,
            password: password
        })
        .returning(["name","email"])
        .then(data => {
            res.json(data[0])
        })
        .catch((err) => {
            if (err.detail.includes('already exists')){
                res.json("Email Already Registerd");
            }
        })
    }

})

app.listen(3000,(req,res) =>{
    console.log(`Listening On port 300...`);
});