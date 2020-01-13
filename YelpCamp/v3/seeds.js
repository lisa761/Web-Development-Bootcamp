var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://pixabay.com/get/57e8dc414e5ba814f6da8c7dda793f7f1636dfe2564c704c722b7ed59249c451_340.jpg",
		description: "blah blah blah blah blah"
	},	
	{
		name: "Desert Mesa",
		image: "https://pixabay.com/get/55e4d5454b51ab14f6da8c7dda793f7f1636dfe2564c704c722b7ed59249c451_340.jpg",
		description: "blah blah blah blah blah"
	},
	{
		name: "Canyon Floor",
		image: "https://pixabay.com/get/55e7d24a485aac14f6da8c7dda793f7f1636dfe2564c704c722b7ed59249c451_340.jpg",
		description: "blah blah blah blah blah"
	}
];

function seedDB() {
	// Remove all campgrounds
	Campground.deleteMany({}, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			console.log("Removed all campgrounds!");
			// Add a few campgrounds
			data.forEach(function(seed) {
				Campground.create(seed, function(err, campg) {
					if(err) {
						console.log(err);
					} else {
						console.log("Added a campground");
						// create a comment
						Comment.create({
							text: "This place is great, but I wish there was internet",
							author: "Homer"
						}, function(err, comment) {
							if(err) {
								console.log(err);
							} else {
								campg.comments.push(comment);
								campg.save();
								console.log("Created a comment");
							}
						});
					}
				});
			});
		}
	});
	// Add a few comments
}

module.exports = seedDB;
