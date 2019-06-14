var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/lookalike", {
    useNewUrlParser: true
});

var clothing = [
    new Product.Clothing({
        image: 'images/clothing/boots.jpg',
        title: 'Boots',
        price: 39.99

    }),
    new Product.Clothing({
        image: 'images/clothing/gloves.jpg',
        title: 'Black Gloves',
        price: 15.99
    }),
    new Product.Clothing({
        image: 'images/clothing/hat.jpg',
        title: 'Black Hat',
        price: 12.99
    }),
    new Product.Clothing({
        image: 'images/clothing/hoodie.jpg',
        title: 'Black Hoodie',
        price: 45.99
    }),
    new Product.Clothing({
        image: 'images/clothing/shirt.jpg',
        title: 'Black T-Shirt',
        price: 19.99
    }),
    new Product.Clothing({
        image: 'images/clothing/socks.jpg',
        title: 'Black Socks',
        price: 7.99
    })

]

var done = 0

for (var i = 0; i < clothing.length; i++) {
    clothing[i].save(function (err, result) {
        done++;
        if (done === clothing.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}