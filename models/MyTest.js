 const mongoose = require("mongoose");


 const testSchema = new mongoose.Schema({
    name: {type: String, required: true},
    number: { type: Number, required: true},
 })



 module.exports = testSchema;