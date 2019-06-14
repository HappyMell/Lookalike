var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
})


//Sign Up Strategy
passport.use('local.register', new LocalStrategy({
    usernameField: 'email',
    password: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email, try again').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password, try again').notEmpty().isLength({
        min: 4
    });
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg)
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({
        'email': email
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {
                message: 'Email is already in use.'
            })
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        })
    })
}))

//Sign In Strategy
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    password: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email, try again').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password, try again').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg)
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({
        'email': email
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'No user found.'
            })
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Invalid password'
            })
        }

        return done(null, user);

    })
}))