var express = require("express"),
    app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//Mongoose config
mongoose.connect("mongodb://localhost:27017/lookalike", {
    useNewUrlParser: true
});

//Body parser config
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//Routes
var homeRoute = require("./routes/home");



//Require routes from other files
app.use("/", homeRoute);







app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Lookalike server has started");
});