const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require('dotenv').config()

const dbConfig = require("./config/db");

const  testSchema = require("./models/MyTest");
const Model = mongoose.model("testcollection", testSchema);



const app = express()
app.set('trust proxy', 1)
app.disable('x-powered-by');
const limiter = rateLimit({
    windowMs : 2880 * 60 * 1000,  // block for 2880 minutes 
    max: 16,   // block after 16 requests
    message: "You have reached maximum retries. Please try again later",
    standardHeaders: false,
    legacyHeaders: false,
})


app.use(limiter);
app.use(helmet());


mongoose.set("strictQuery", true);
app.use(bodyParser.urlencoded({ extended: true }));


async function connectToDatabase(){
    try {
        await mongoose.connect(dbConfig.db) 
        console.log("connected to db")
    } catch (error) {
        throw error
    }
}

connectToDatabase()

app.get("/", function(req, res){
    res.send("Hello World");
})

app.get("/getip", function(req, res){
    res.send(req.ip)
    
})

app.get("/getcontent", function(req, res){
    async function getUsers(){
        try {
            const users  = await Model.find({});
            res.send(users)
        } catch (error) {
            res.send("Error while retriving data")
        } 
    }
    getUsers()

})



app.post("/postcontentdkjfadskjfhd/dfdksjhfkjashfsdkf/djhfkjdshf", function(req, res){
    async function addUser(name, number){
        try {
            const newUser = new Model({name:name, number:number});
            const savedUser = await newUser.save();
            if (savedUser){
                res.send("Saved data")
            }
        } catch(err){
            console.log("Error while saving the data")
        }
    }
    addUser(req.body.name, req.body.number);
})


app.listen(3000, function(){
    console.log("server is running on 3000")
})
