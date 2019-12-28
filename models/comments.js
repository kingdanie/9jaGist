var mongoose        = require("mongoose");

//schema setup
var commentSchema = new mongoose.Schema({
    username: String,
    message: String,
});

module.exports = mongoose.model("Comments", commentSchema);