var express = require("express");
var router = express.Router();
var Subscription = require("../models/subscribe");
var Discography = require("../models/discography");
var News = require("../models/news");

//Root Route
router.get("/", function (req, res) {
    News.find({}, function (err, docs) {
        var newsChunks = [];
        var chunkSize = 1;
        for (var i = 0; i < docs.length; i += chunkSize) {
            newsChunks.push(docs.slice(i, i + chunkSize))
        }

        res.render("home", {
            page: "home",
            news: newsChunks,
        });
    });
});

//Discography
router.get("/discography", function (req, res) {
    Discography.find({}, function (err, album) {
        var index = album.index;
        var albumChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < 6; i += chunkSize) {
            albumChunks.push(album.slice(i, i + chunkSize))
        }
        res.render("discography", {
            album: albumChunks,
            index: index
        })
    });
});

//Follow / Social Media
router.get("/social-media", function (req, res) {
    res.render("follow", {
        page: "follow"
    });
});



//Social media and email subscription
router.post("/social-media", function (req, res) {
    var email = req.body.email;

    var newSubscription = {
        email: email
    };
    Subscription.create(newSubscription, function (err, newlySubscribed) {
        if (err) {
            console.log(err)
        } else {
            res.render("thank-you");
        }
    })
})
module.exports = router;