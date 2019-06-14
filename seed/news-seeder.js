var News = require('../models/news');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/lookalike", {
    useNewUrlParser: true
});

var news = [
    new News({
        image: 'images/news/fader.jpg',
        title: 'In the studio again',
        description: 'Very excited to be back in the studio again with my bandmates. Stay tuned for our newest record'
    }),
    new News({
        image: 'images/news/hearts.jpg',
        title: 'We love our fans',
        description: 'Thanks so much for the support you showed us tonight. Amazing show last night.'
    }),
    new News({
        image: 'images/news/keyboard.jpg',
        title: 'Live in living color',
        description: 'Great night last night in Toronto. Always a treasure.'
    }),
    new News({
        image: 'images/news/mic.jpg',
        title: 'The Tate - London',
        description: 'Art exhibition will be held in London, The Tate'
    }),
    new News({
        image: 'images/news/music.jpg',
        title: 'Music for the people',
        descrption: 'Cant make the show? You can watch it live at the Music for the People pub in Shoreditch'
    }),
    new News({
        image: 'images/news/open.jpg',
        title: 'Aneheim - California',
        descrption: 'You were a beautiful crowd yesterday, California'
    }),
    new News({
        image: 'images/news/piano.jpg',
        title: 'Acoustic - Coming soon',
        description: 'Pleased to announce our hits will be released acoustic'
    }),
    new News({
        image: 'images/news/record.jpg',
        title: 'Best played on vinyl',
        description: 'All our records are always best played on vinyl, pick yours up today'
    }),
    new News({
        image: 'images/news/studio.jpg',
        title: 'BAND is always in the studio',
        description: 'Always releasing music. Always making art.'
    }),


]

var done = 0

for (var i = 0; i < news.length; i++) {
    news[i].save(function (err, result) {
        done++;
        if (done === news.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}