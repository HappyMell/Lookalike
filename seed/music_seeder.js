var Music = require('../models/music');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/lookalike", {
    useNewUrlParser: true
});

var music = [
    new Music({
        imagePath: 'images/album1.jpg',
        title: 'The First Album',
        price: 12.99
    }),
    new Music({
        imagePath: 'images/album2.jpg',
        title: 'The Second Album',
        price: 13.99
    }),
    new Music({
        imagePath: 'images/album 5.jpeg',
        title: 'The Third Album',
        price: 11.99
    }),
    new Music({
        imagePath: 'images/band1.jpg',
        title: 'The Fourth Album',
        price: 10.99
    }),
    new Music({
        imagePath: 'images/band3.jpg',
        title: 'The Fifth Album',
        price: 12.99
    }),
    new Music({
        imagePath: 'images/band4.jpg',
        title: 'The Sixth Album',
        price: 14.99
    }),
    new Music({
        imagePath: 'images/band5.jpg',
        title: 'The Seventh Album',
        price: 19.99
    }),
    new Music({
        imagePath: 'images/band6.jpg',
        title: 'The Eigth Album',
        price: 13.99
    }),
    new Music({
        imagePath: 'images/band8.jpg',
        title: 'The Nineth Album',
        price: 15.99
    }),


]

for (var i = 0; i < music.length; i++) {
    music[i].save();
}

mongoose.disconnect();