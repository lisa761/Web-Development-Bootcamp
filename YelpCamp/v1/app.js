var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
	{name: "Salmon Creek", image: "https://source.unsplash.com/Czw5tWFGNOI"},
	{name: "Granite Hill", image: "https://source.unsplash.com/Hxs6EAdI2Q8"},
	{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/KxbhrMzp-Rk"},
	{name: "Salmon Creek", image: "https://source.unsplash.com/Czw5tWFGNOI"},
	{name: "Granite Hill", image: "https://source.unsplash.com/Hxs6EAdI2Q8"},
	{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/KxbhrMzp-Rk"},
	{name: "Salmon Creek", image: "https://source.unsplash.com/Czw5tWFGNOI"},
	{name: "Granite Hill", image: "https://source.unsplash.com/Hxs6EAdI2Q8"},
	{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/KxbhrMzp-Rk"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(3000, function() {
	console.log("The YelpCamp Server Has Started!");
});