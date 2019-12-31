var express     = require("express"),
    router      = express.Router(),
    passport        = require("passport"),
    User           = require("../models/user");


router.get("/", (req, res)=>
    res.render("landing")
);




//AUTH ROUTES
router.get("/signup", function(req, res){
    res.render("signup");
});
router.post("/signup", function(req, res){
    var newUser = new User({email: req.body.email, username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/forums");
        });
    });
});

//show log in form
router.get("/login", function(req, res){
    res.render("login");
});
//login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/forums",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/forums");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}    

module.exports = router;