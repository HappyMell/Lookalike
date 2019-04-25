var express = require("express");
var router = express.Router();

//Root Route
router.get("/", function (req, res) {
    res.render("home", {
        page: "home"
    });
});

router.get("/discography", function (req, res) {
    res.render("discography", {
        page: "discography"
    });
});

router.get("/social-media", function (req, res) {
    res.render("follow", {
        page: "follow"
    });
});

module.exports = router;