var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.session.oldUrl = req.url;
        res.redirect("/login");
    }
}




module.exports = middlewareObj