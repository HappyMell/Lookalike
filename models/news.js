var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("News", newsSchema);