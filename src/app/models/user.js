var mongoose = require("mongoose");
var schemaUser = new mongoose.Schema({
    FullName: String,
    Address: String,
    Email: String,
    City: String,
    UserName: String,
    PassWord: String,
    Office: Number
});

module.exports = mongoose.model("User", schemaUser);
