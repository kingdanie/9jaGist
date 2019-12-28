var mongoose        = require("mongoose");

//schema setup
var forumSchema = new mongoose.Schema({
    email: String,
    title: String,
    message: String,
    name: String,
    image: String, 
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Forum", forumSchema);