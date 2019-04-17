var express = require("express");
var router = express.Router();

//Root Route
router.get("/", function (req, res) {
    res.render("home");
});

module.exports = router;