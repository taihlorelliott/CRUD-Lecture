// requiring dotenv package to work
const dotenv = require('dotenv')
dotenv.config(); //loads the variables from .env
//requiring the express package to work 
const express = require('express');
// require mongoose package to work
const mongoose = require('mongoose');

const app = express();

//connect to mongoDB with connection link from .env file
mongoose.connect(process.env.MONGODB_URI);
//log connection string in terminal on start
mongoose.connection.on('connected', () => {
    //logs the name of the file from the .env file
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

//importing the fruit model (friut.js)
const Fruit = require("./models/fruit.js");

app.get('/', async (req, res) => {
    res.render("index.ejs")
})

//building new fruits page
app.get('/fruits/new', (req, res) => {
    res.send("This route sends the user a form page!");
})

app.listen(3001, () => {
    console.log("listening on port 3001")
})