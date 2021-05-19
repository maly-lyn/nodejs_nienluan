var mongoose = require("mongoose");
var schemaProduct = new mongoose.Schema({
    Name: String,
    Image: String,
    Describe: String,
    Quantity: Number,
    Price: Number
});

module.exports = mongoose.model("Product", schemaProduct);