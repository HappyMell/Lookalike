var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

UserSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);