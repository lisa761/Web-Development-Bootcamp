var express  		 	  = require("express"),
	app 	 			  = express(),
	mongoose 			  = require("mongoose"),
	passport 			  = require("passport"),
	bodyParser 			  = require("body-parser"),
	localStrategy 		  = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	User				  = require("./models/user");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/auth_demo_app");

app.use(require("express-session")({
	secret: "I really really want a dog and while I am it, a life as well",
	resave: false,
	saveUnitialized: false
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
// serializes the data that is encodes the information
passport.deserializeUser(User.deserializeUser());
// takes data from the session and deserializes it that is decodes it

// these methods have been defined in the User model by the passportLocalMongoose plugin, and we are simply asking passport here to use those methods instead of defining our own serialize and deserialize methods

// ===============
// ROUTES
// ===============

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
	res.render("secret");
});

// Auth Routes

//show sign up form
app.get("/register", function(req, res) {
   res.render("register"); 
});
//handling user sign up
app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		// we do not save password directly to the database
        if(err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function() {
           res.redirect("/secret");
        });
    });
});

// LOGIN ROUTES
//render login form
app.get("/login", function(req, res) {
   res.render("login"); 
});
//login logic
//middleware
app.post("/login", passport.authenticate("local", {
    	successRedirect: "/secret",
    	failureRedirect: "/login"
	}), function(req, res){
});

// LOGOUT ROUTES
app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}	
	res.redirect("/login");
};

app.listen(3000, function() {
	console.log("SERVER LISTENING!");
});