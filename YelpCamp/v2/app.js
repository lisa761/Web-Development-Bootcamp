/*  var campgrounds = [
	{name: "Salmon Creek", image: "https://source.unsplash.com/Czw5tWFGNOI"},
	{name: "Granite Hill", image: "https://source.unsplash.com/Hxs6EAdI2Q8"},
	{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/KxbhrMzp-Rk"},
	{name: "Salmon Creek", image: "https://source.unsplash.com/Czw5tWFGNOI"},
	{name: "Granite Hill", image: "https://source.unsplash.com/Hxs6EAdI2Q8"},
	{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/KxbhrMzp-Rk"},
	{name: "Salmon Creek", image: "https://source.unsplash.com/Czw5tWFGNOI"},
	{name: "Granite Hill", image: "https://source.unsplash.com/Hxs6EAdI2Q8"},
	{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/KxbhrMzp-Rk"}
]; */

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Granite Hill",
// 	image: "https://source.unsplash.com/Hxs6EAdI2Q8",
// 	description: "This is a huge granite hill, no bathrooms. No water, beautiful granite! "
// }, function(err, campground) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY CREATED CAMPGROUND: ");
// 		console.log(campground);
// 	}
// });

app.get("/", function(req, res) {
	res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
 	// Get all camogrounds from the DB
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds: campgrounds});
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	// campgrounds.push(newCampground);
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
	// res.redirect("/campgrounds");
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	// find campground with provided Id
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			// render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
});

// this order of /campgrounds/new and /campgrounds/:id is important as if id was before, then new would also be treated as a show page instead of a new page

app.listen(3000, function() {
	console.log("The YelpCamp Server Has Started!");
});