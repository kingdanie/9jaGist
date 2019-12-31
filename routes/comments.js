var express     = require("express");
var router      = express.Router({mergeParams: true});
var Forum       = require("../models/forum");
var Comment     = require("../models/comments");

// =========================================
// COMMENTS ROUTES
// =========================================
router.get("/new", isLoggedIn, function(req, res){
    //find forum by 
        // Forum.findById(req.params.id).populate("comments").exec(function(err, forum){
    Forum.findById(req.params.id, function(err, forum){
        if(err){
            console.log(err);
            res.redirect('/forums');
        } else {
            //render template with that forum
            res.render("comments/new", {forum: forum});
        }
    })
});

router.post("/", isLoggedIn, function(req, res){
    //lookup forum using Id
    Forum.findById(req.params.id, function(err, forum){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);

                } else {
                    // console.log(comment);
                    forum.comments.push(comment);
                    forum.save();
                    res.redirect('/forums/' + forum._id);
                }
            });
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