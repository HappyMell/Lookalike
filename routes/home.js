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

module.exports = router;