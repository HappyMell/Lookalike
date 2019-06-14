var express = require("express");
var router = express.Router();
var middleware = require("../middleware/index");
var Order = require("../models/order");
var Cart = require("../models/cart");
var passport = require("passport");
var csurf = require('csurf');
var csrfProtection = csurf({
    cookie: true
});

//Account

router.get("/account", middleware.isLoggedIn, function (req, res) {
    Order.find({
        user: req.user
    }, function (err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
            items = order.items;
        });
        res.render("./user/account", {
            orders: orders,
            items: items
        });
    });
});

router.get('/profile', middleware.isLoggedIn, function (req, res) {

})



//Store - Register

router.get("/register", csrfProtection, function (req, res) {
    var messages = req.flash('error');
    res.render("./user/register", {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0

    });
})

//Store - Register Form Logic

router.post("/register", csrfProtection, passport.authenticate('local.register', {
        failureRedirect: '/register',
        failureFlash: true
    }),
    function (req, res) {
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/account')
        }
    });






//Store - Log in
router.get("/login", csrfProtection, function (req, res) {
    var messages = req.flash('error');
    res.render("./user/login", {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0,
        page: "login"
    });
});

//Store - Login Form Logic
router.post("/login", passport.authenticate("local.signin", {
    failureRedirect: "/login",
    failureFlash: true

}), function (req, res) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/account')
    }
});

//Store - Log Out
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/store");
});

//Store - My Account




module.exports = router;