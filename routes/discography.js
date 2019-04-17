var express = require("express");
var router = express.Router();

//Root Route
router.get("/discography", function (req, res) {
    res.render("discography");
});

module.exports = router;