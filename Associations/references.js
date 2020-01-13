var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");

// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher"
// });

Post.create({
	title: "How to cook the best burger pt. 4",
	content: "SRGETYGBFXDFST"
}, function(err, post) {
	// console.log(post);
	if(err) {
		console.log(err);
	} else {
		User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
			if(err) {
				console.log(err);
			} else {
				foundUser.posts.push(post);
				foundUser.save(function(err, data) {
					if(err) {
						console.log(err);
					} else {
						console.log(data);
					}
				});
			}
		});
	}
});

// To see the content of post for user
// Find user
// Find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });
