const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dbConfig = require("./config/db");

const  testSchema = require("./models/MyTest");
const Model = mongoose.model("testcollection", testSchema);



const app = express()


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