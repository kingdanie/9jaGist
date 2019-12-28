var mongoose        = require("mongoose");

//schema setup
var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    Username: String,
    Password: String,
});

module.exports = mongoose.model("User", userSchema);