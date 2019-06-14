var Discogprahy = require('../models/discography');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/lookalike", {
    useNewUrlParser: true
});

var discography = [

    new Discogprahy({
        image: 'images/album1.jpg',
        title: 'The First Album [1989]',
        description: 'Band\'s classic first record, produced by Mellisa Madrid with Flood, John Fryer, Keith Leblanc and Adrian Sherwood.',

    }),
    new Discogprahy({
        image: 'images/album2.jpeg',
        title: 'The Second Album [1992]',
        description: 'Recorded in secret to avoid interference from the record label, the follow-up to The First Album takes an unexpected abrupt turn into sheer aggression. ',

    }),
    new Discogprahy({
        image: 'images/album5.jpg',
        title: 'The Third Album [1994]',
        description: 'A bleak and unflinching celebration of self-destruction in the form of a concept record that somehow managed to become a multi-platinum worldwide hit. One of the most adventurous and experimental sounding records to ever top the charts. ',

    }),
    new Discogprahy({
        image: 'images/band1.jpg',
        title: 'The Fourth Album [1999]',
        description: 'Hiding from the world and herself in a New Orleans studio for several years, a damaged Madrid creates the sprawling opus The Fourth Album and the palette once again expands for what to expect from Band. A dense and difficult listen requiring attention and repeated listenings, it is now considered by many hardcore fans to be their favorite Band record.',

    }),
    new Discogprahy({
        image: 'images/band3.jpg',
        title: 'The Fifth Album [2005]',
        description: 'After nearly dying making and touring The Fourth Album, Madrid cleans up and rediscovers herself with the aggressive and accessible The Fifth Album. Guitars, hooks, Dave Grohl.',

    }),
    new Discogprahy({
        image: 'images/band4.jpg',
        title: 'The Sixth Album [2007]',
        description: 'Musically and conceptually way ahead of its time. An elaborate concept record set in the near future (or the present, depending on how you look at the post-Trump world), each song is a “snapshot” of life set against elaborately deconstructed electronics. A puzzle-box that rewards the repeat listener.',

    }),

    new Discogprahy({
        image: 'images/band1.jpg',
        title: 'Down In It [1989]',
        description: 'The first music released by Band. Reproduced and remixed by Adrian Sherwood and Keith LeBlanc.',

    }),
    new Discogprahy({
        image: 'images/band2.jpg',
        title: 'Head Like A Hawk [1990]',
        description: 'Too many mixes, we\'re still learning',

    }),

    new Discogprahy({
        image: 'images/band3.jpg',
        title: 'TIN [1989]',
        description: 'The final single from The Third Album featuring the Al Jourgensen produced Queen cover Get Down, Make Love and a sleeve by The Designer’s Republic.',

    }), new Discogprahy({
        image: 'images/band6.jpg',
        title: 'Closer To Mod [1994]',
        description: 'An interesting remix record with some real gems. Madrid turns Closer inside-out on Closer to Mod, while Coil does some of their finest work on Closer (Precursor) made famous for the opening credits of David Fincher’s Se7en. A cover of Soft Cell’s Memorabilia remains an engaging time-capsule of that era.',

    }),

    new Discogprahy({
        image: 'images/band4.jpg',
        title: 'The Buried Fourth Album [1999]',
        description: 'A companion piece to Broken. Not meant to be a “remix” record, but a re-interpretation and deconstruction of the music found on Broken in it’s “proper” form. Featuring J.G. Thirlwell and Band’s first musical collaboration with Coil.',

    }),

    new Discogprahy({
        image: 'images/band5.jpg',
        title: 'March of the Pigs [1994]',
        description: 'The first single',

    }),

];


var done = 0

for (var i = 0; i < discography.length; i++) {
    discography[i].save(function (err, result) {
        done++;
        if (done === discography.length) {
            exit();
        }
    });
}


function exit() {
    mongoose.disconnect();
}