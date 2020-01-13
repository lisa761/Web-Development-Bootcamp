// all the middleware goes here

var Campground = require("../models/campground");
var Comment    = require("../models/comment");

var middlewareObj = {
	isLoggedIn: function(req, res, next) {
		if(req.isAuthenticated()) {
			return next();
		}
		res.redirect("/login");
	}
};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	// is user logged in?
	  // does user own this campground
	  // otherwise redirect
	// if not, redirect
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if(err) {
				res.redirect("back");
			} else {
				if(foundCampground.author.id.equals(req.user._id)) {
					// the req.user._id is a string but the foundCampground.author.id is a mongoose object and therefore aren't the same type and we cannot use ===, we obviously (I think) can use == but we just go with this method given to us by mongoose for this purpose
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
		// goes back to where the user has come from
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err) {
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

module.exports = middlewareObj;