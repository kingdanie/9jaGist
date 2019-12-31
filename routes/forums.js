var express     = require("express");
var router      = express.Router();
var Forum       = require("../models/forum");
var Comment     = require("../models/comments");

router.get("/", function(req, res){
    //get all forums from db
    Forum.find({}, function(err, allForums){
        if(err){
            console.log(err);
        } else{
            res.render("forums/index", {forums:allForums});
        }
    });
    // res.render("forums", {forums:forums});
});


//route for creating new topic 
router.post("/", function(req, res){
    // res.send("welcome to post route");
    //get data from form taht will  be added to forums array
    var email= req.body.email;
    var title = req.body.title;
    var message = req.body.message;
    console.log(email, title, message);
    var newForum = {email: email, title: title, message: message}
    //create a new topic and save to db
    Forum.create(newForum, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to forums page
            console.log(newlyCreated);
            res.redirect("/forums");
        }
    });
    // forums.push(newForum);    
});

//shows form that submits the data to the forums
router.get("/new", (req, res)=>
    res.render("forums/new")
);

//show more info about a forum
router.get("/:id", function(req, res){
    //find the forum with the provided id
    Forum.findById(req.params.id, function(err, foundForum){
        if(err){
            console.log(err);
        } else {
            //render template with that forum
            res.render("forums/show", {forum: foundForum});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}  

module.exports = router;