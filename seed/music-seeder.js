var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/lookalike", {
    useNewUrlParser: true
});

var music = [
    new Product.Music({
        image: 'images/album1.jpg',
        title: 'The First Album',
        price: 12.99
    }),
    new Product.Music({
        image: 'images/album2.jpeg',
        title: 'The Second Album',
        price: 13.99
    }),
    new Product.Music({
        image: 'images/album5.jpg',
        title: 'The Third Album',
        price: 11.99
    }),
    new Product.Music({
        image: 'images/band1.jpg',
        title: 'The Fourth Album',
        price: 10.99
    }),
    new Product.Music({
        image: 'images/band3.jpg',
        title: 'The Fifth Album',
        price: 12.99
    }),
    new Product.Music({
        image: 'images/band4.jpg',
        title: 'The Sixth Album',
        price: 14.99
    }),
    new Product.Music({
        image: 'images/band5.jpg',
        title: 'The Seventh Album',
        price: 19.99
    }),
    new Product.Music({
        image: 'images/band6.jpg',
        title: 'The Eigth Album',
        price: 13.99
    }),
    new Product.Music({
        image: 'images/band8.jpg',
        title: 'The Ninth Album',
        price: 15.99
    })
]

var done = 0

for (var i = 0; i < music.length; i++) {
    music[i].save(function (err, result) {
        done++;
        if (done === music.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}