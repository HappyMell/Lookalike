var express = require("express");
var router = express.Router();
var Subscription = require("../models/subscribe");
var Music = require("../models/music");

//Root Route
router.get("/", function (req, res) {
    res.render("home", {
        page: "home"
    });
});
//Discography
router.get("/discography", function (req, res) {
    res.render("discography", {
        page: "discography"
    });
});

//Follow / Social Media
router.get("/social-media", function (req, res) {
    res.render("follow", {
        page: "follow"
    });
});

//Store
router.get("/store", function (req, res) {
    res.render("store", {
        page: "store"
    })
})

//Store - Music
router.get("/music", function (req, res) {
    var music = Music.find();
    res.render("music", {
        page: "music",
        music: music
    })
})

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