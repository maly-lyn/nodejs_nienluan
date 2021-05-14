var mongoose = require("mongoose");

var schemaSanpham = new mongoose.Schema({
    Name: String,
    Image: String,
    Price: Number
});

module.exports = mongoose.model("Sanpham", schemaSanpham);