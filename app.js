var express = require("express"),
    app = express();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var postcss = require('postcss');
var atImport = require('postcss-import');
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");
var validator = require("express-validator");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);


var User = require("./models/user");



//Routes
var homeRoute = require("./routes/home");
var userRoute = require("./routes/user");
var storeRoute = require("./routes/store");

//Mongoose config
mongoose.connect("mongodb://localhost:27017/lookalike", {
    useNewUrlParser: true
});

//Import Passport File
require('./config/passport');

//Body parser config
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


// Validator Config
app.use(validator());

//Cookie Parser
app.use(cookieParser());

//Method Override config
app.use(methodOverride("_method"));

//Express Session Config & Mongo Store
app.use(session({
    secret: "I love cats all day",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 180 * 60 * 1000
    }
}));

//Flash Configure
app.use(flash());

//Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//All locals
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.header = {
        query: req.query,
        url: req.originalUrl
    }
    next();
})


//Post CSS config
var css = fs.readFileSync("/Users/Mellisa/Desktop/Lookalike/public/css/style.css", "utf8");

postcss()
    .use(atImport())
    .process(css, {
        from: "public/css/style.css"
    })
    .then(function (result) {
        var output = result.css

        fs.writeFileSync("/Users/Mellisa/Desktop/Lookalike/public/css/finalstyle.css", result.css) // <-- need a different name to differentiate input css and the output from postcss
        if (result.map) {
            fs.writeFileSync('/Users/Mellisa/Desktop/Lookalike/public/css/finalstyle.css.map', result.map)
        }
    })






//Require routes from other files
app.use("/", userRoute);
app.use("/", storeRoute);
app.use("/", homeRoute);






app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Lookalike server has started");
});