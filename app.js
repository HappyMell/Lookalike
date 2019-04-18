var express = require("express"),
    app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//Routes
var homeRoute = require("./routes/home");



//Require routes from other files
app.use("/", homeRoute);
app.use("/discography", homeRoute);






app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Lookalike server has started");
});