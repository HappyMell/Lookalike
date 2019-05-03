var express = require("express"),
    app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var postcss = require('postcss');
var atImport = require('postcss-import');


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


//Post CSS congig
var css = fs.readFileSync("/Users/Mellisa/Desktop/Lookalike/public/css/style.css", "utf8");

postcss()
    .use(atImport())
    .process(css, {
        from: "public/css/style.css"
    })
    .then(function (result) {
        var output = result.css
        console.log(output);
        fs.writeFileSync("/Users/Mellisa/Desktop/Lookalike/public/css/finalstyle.css", result.css) // <-- need a different name to differentiate input css and the output from postcss
        if (result.map) {
            fs.writeFileSync('/Users/Mellisa/Desktop/Lookalike/public/css/finalstyle.css.map', result.map)
        }
    })


//Routes
var homeRoute = require("./routes/home");



//Require routes from other files
app.use("/", homeRoute);







app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Lookalike server has started");
});