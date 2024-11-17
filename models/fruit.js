// require and install mongoose package
const mongoose = require('mongoose');

// models schema (a collection is an array)

//what this says is that the fruit collection is an array of objects
//and each object can only have these properties 
//name (which must be a string)
//isReadyToEat (which must be a boolean)
const fruitSchema = new mongoose.Schema({
    //ristrictions on what each object can have 
    name: String,
    isReadyToEat: Boolean,
})

//now that we have created the schema we must create the collection itself
//breakdown Fruit is what we can use to call this function
//mongoose.model means we are creating a collection (think array)
//it will be called "Fruit"
//fruitSchema is the restrictions that it has on it so we know all the 
//objects must adhere to the schema 
const Fruit = mongoose.model("Fruit", fruitSchema);

//export the model
module.exports = Fruit;