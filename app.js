var express         = require("express"),
    app                 = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    session         = require("express-session"),
    Forum           = require("./models/forum"),
    Comment           = require("./models/comments"),
    User           = require("./models/user");


var commentRoutes   = require("./routes/comments"),
    forumRoutes     = require("./routes/forums"),
    indexRoutes     = require("./routes/index");

//create schema for db using mongoose
mongoose.connect("mongodb://localhost:27017/9jagist", {useNewUrlParser: true, useUnifiedTopology: true });



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "9jagist is the best blog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Forum.create(
//     {
//         name: "steven job",
//         title: "Second post",
//         message: "let me be the second to comment in this platform",
//         email: "steve@goc.com"
//     }, function(err, forum){
//     if(err){ console.log(err);
//         } else{
//             console.log("newly created: ");
//             console.log(forum);
//         }
//     })

// var forums = [
//     {name: "lifestyle", image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fsites.google.com%2Fsite%2Fproveyoureself%2Fhome%2Fslide1.jpg%3Fattredirects%3D0&imgrefurl=https%3A%2F%2Fsites.google.com%2Fsite%2Fproveyoureself%2F&docid=JRoRxtFldfiRQM&tbnid=LsBI1EjOpNSLDM%3A&vet=10ahUKEwi-_6bay87mAhVSUMAKHVKXBBAQMwigASgZMBk..i&w=623&h=416&bih=657&biw=1366&q=lifestyle&ved=0ahUKEwi-_6bay87mAhVSUMAKHVKXBBAQMwigASgZMBk&iact=mrc&uact=8"},
//     {name: "technology", image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.japan.go.jp%2Ftechnology%2F_userdata%2Fimg%2Fogp%2Fogp.png&imgrefurl=https%3A%2F%2Fwww.japan.go.jp%2Ftechnology%2F&docid=E1bomNHiSpthtM&tbnid=wynQI5-naDPlnM%3A&vet=10ahUKEwjmwOL0y87mAhWSQ0EAHXgRBcIQMwi6ASg5MDk..i&w=1200&h=630&bih=657&biw=1366&q=technology&ved=0ahUKEwjmwOL0y87mAhWSQ0EAHXgRBcIQMwi6ASg5MDk&iact=mrc&uact=8"},
//     {name: "phones", image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.stuff.tv%2Fsites%2Fstuff.tv%2Ffiles%2Fbrands%2F5G%2FBest-phones%2Fbest-5g-phones.jpg&imgrefurl=https%3A%2F%2Fwww.stuff.tv%2Ffeatures%2F6-best-5g-phones-you-can-buy-today&docid=sS4PWSj89cJiSM&tbnid=dvyR0nOnNJyhFM%3A&vet=10ahUKEwiqw5GOzM7mAhWQgVwKHf0cAqcQMwh8KAQwBA..i&w=1200&h=900&bih=657&biw=1366&q=phones&ved=0ahUKEwiqw5GOzM7mAhWQgVwKHf0cAqcQMwh8KAQwBA&iact=mrc&uact=8"},
//     {name: "business", image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.investopedia.com%2Fthmb%2FxmG9FV9J_3hd_p8TMktrBG34Rvs%3D%2F1620x1080%2Ffilters%3Afill(auto%2C1)%2Fachievement-agreement-arms-business-agreement-business-deal-cheerful-1448611-pxhere.com-afa4d8399a684cfbb5467402c7639663.jpg&imgrefurl=https%3A%2F%2Fwww.investopedia.com%2Fterms%2Fb%2Fbusiness.asp&docid=w0BfD8gMXq0L7M&tbnid=fE441fXFzw5_UM%3A&vet=10ahUKEwj_vNWazM7mAhUHfMAKHf6DA38QMwh2KAAwAA..i&w=1620&h=1080&bih=657&biw=1366&q=business&ved=0ahUKEwj_vNWazM7mAhUHfMAKHf6DA38QMwh2KAAwAA&iact=mrc&uact=8"},
//     {name: "Agriculture", image: "shutterstock-653708227.jpg"},
//     {name: "We are here", image: "shutterstock-653708227.jpg", email: "sblik@StaticRange.com", title: "all things are good", message: "this is just a sample message to test if the text will be parsed"}
// ];

app.use("/",indexRoutes);
app.use("/forums", forumRoutes);
app.use("/forums/:id/comments", commentRoutes);
   
/*app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The 9jaGist Server has started!");
});*/ 
app.listen(4000, process.env.IP, ()=>
    console.log("The 9jaGist Server has started!")
); 