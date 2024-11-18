// requiring dotenv package to work
const dotenv = require('dotenv')
dotenv.config(); //loads the variables from .env
//requiring the express package to work 
const express = require('express');
// require mongoose package to work
const mongoose = require('mongoose');
// require the method-override package to work
const methodOverride = require("method-override");
// require the morgan package to work
const morgan = require('morgan');

const app = express();

//connect to mongoDB with connection link from .env file
mongoose.connect(process.env.MONGODB_URI);
//log connection string in terminal on start
mongoose.connection.on('connected', () => {
    //logs the name of the file from the .env file
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

//this tells express "hey expect user data to come in from a form"
app.use(express.urlencoded({ extended: false }));
//the string in this will be a query param
app.use(methodOverride("_method"));
//helps with finding bugs sometimes, not 100% necessary
// app.use(morgan("dev"));


//importing the fruit model (friut.js)
const Fruit = require("./models/fruit.js");

app.get('/', async (req, res) => {
    res.render("index.ejs")
})

//building a route to the edit page
app.get("/fruits/:fruitId/edit", async (req, res)=>{
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/edit.ejs', {fruit: foundFruit})
})

//building new fruits page
app.get('/fruits/new', (req, res) => {
    //res.render to show the ejs page
    res.render("fruits/new.ejs");
})

//defining a show route for the individual fruits has to go after 
//fruit/new so when you route to fruit/new this does not override it
app.get('/fruits/:fruitId', async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", {
        fruit: foundFruit
    })
});

//post fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    // take me to another page
    res.redirect('/fruits');
})

//establish and build the delete route
app.delete("/fruits/:fruitId", async (req,res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId)
    res.redirect('/fruits')
})

//get fruits to all display
app.get("/fruits", async (req, res)=> {
    const allFruits = await Fruit.find()
    res.render("fruits/index.ejs", {
        fruits: allFruits
    })
})

app.listen(3001, () => {
    console.log("listening on port 3001")
})