var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

//schema setup
var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    Password: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);