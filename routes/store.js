var express = require("express");
var router = express.Router();
var middleware = require("../middleware/index");
var Product = require("../models/product");
var Cart = require("../models/cart");
var Order = require("../models/order");


//Store
router.get("/store", function (req, res) {
    var successMsg = req.flash('success')[0];
    res.render("store", {
        page: "store",
        successMsg: successMsg,
        noMessage: !successMsg,
    })
})



//Store - Music
router.get("/music", function (req, res, next) {
    Product.Music.find({}, function (err, product) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < product.length; i += chunkSize) {
            productChunks.push(product.slice(i, i + chunkSize))
        }
        res.render("./store/music", {
            product: productChunks,
        })
    });
})

//Store - Music - Add to Cart

router.get("/music/add-to-cart/:id", function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.Music.findById(productId, function (err, product) {
        if (err) {
            return res.redirect("/music");
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/music")
    });

});


//Store - Clothing
router.get("/clothing", function (req, res, next) {
    Product.Clothing.find({}, function (err, product) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < product.length; i += chunkSize) {
            productChunks.push(product.slice(i, i + chunkSize))
        }
        res.render("./store/clothing", {
            product: productChunks,
        })
    });
})

//Store - Clothing - Add to Cart

router.get("/clothing/add-to-cart/:id", function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.Clothing.findById(productId, function (err, product) {
        if (err) {
            return res.redirect("/clothing");
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/clothing")
    });

});

//Store - Objects
router.get("/objects", function (req, res, next) {
    Product.Objects.find({}, function (err, product) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < product.length; i += chunkSize) {
            productChunks.push(product.slice(i, i + chunkSize))
        }
        res.render("./store/objects", {
            product: productChunks,
        })
    });
})

//Store - Objects - Add to Cart 
router.get("/objects/add-to-cart/:id", function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.Objects.findById(productId, function (err, product) {
        if (err) {
            return res.redirect("/music");
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/objects")
    });


});

//Shopping Bag
router.get("/shopping-bag", function (req, res) {
    if (!req.session.cart) {
        return res.render("./store/shopping-bag", {
            product: null
        })
    }
    var cart = new Cart(req.session.cart);
    res.render('./store/shopping-bag', {
        product: cart.generateArray(),
        totalQty: cart.totalQty,
        totalPrice: cart.totalPrice
    })
})

//Reduce / Increase items in shopping bag
router.get('/reduce/:id', function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-bag');
});


//Increase items in shopping bag
router.get('/increase/:id', function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.addMore(productId);
    req.session.cart = cart;
    res.redirect('/shopping-bag');
});

//Remove from shopping bag
router.get('/remove/:id', function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-bag');
});



//Check out

router.get("/checkout", middleware.isLoggedIn, function (req, res) {
    if (!req.session.cart) {
        return res.redirect("./store/shopping-bag");
    }

    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render("./store/checkout", {
        totalQty: cart.totalQty,
        qty: cart.qty,
        product: cart.generateArray(),
        total: cart.totalPrice,
        errMsg: errMsg,
        noError: !errMsg
    })


})


//Check out - Post
router.post("/checkout", middleware.isLoggedIn, function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect("./store/shopping-bag");
    }

    var cart = new Cart(req.session.cart);

    const stripe = require('stripe')('sk_test_mtpyH4UkysLzGttuQ7xCt6sx00OxPDK4nT');

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "gbp",
        source: req.body.stripeToken,
        description: "Test charge"
    }, function (err, charge) {
        // asynchronously called
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout')
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function (err, result) {
            req.flash('success', 'Purchase complete!');
            req.session.cart = null;
            res.redirect('/store')
        })

    });
})

module.exports = router;