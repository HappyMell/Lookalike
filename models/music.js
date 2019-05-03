var mongoose = require('mongoose');

var musicSchema = new mongoose.Schema({
    image: String,
    title: String,
    price: Number
})

module.exports = mongoose.model("Music", musicSchema);