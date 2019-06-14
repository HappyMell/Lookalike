var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/lookalike", {
    useNewUrlParser: true
});

var objects = [
    new Product.Objects({
        image: 'images/objects/bottle.jpg',
        title: 'Black Bottle',
        price: 3.99

    }),
    new Product.Objects({
        image: 'images/objects/mug.jpg',
        title: 'Black Mug',
        price: 4.99
    }),
    new Product.Objects({
        image: 'images/objects/pen.jpg',
        title: 'Black Pen',
        price: 2.99
    })
]

var done = 0

for (var i = 0; i < objects.length; i++) {
    objects[i].save(function (err, result) {
        done++;
        if (done === objects.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}