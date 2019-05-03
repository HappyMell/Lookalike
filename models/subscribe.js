var mongoose = require('mongoose');

var subscribeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Subscribe", subscribeSchema);