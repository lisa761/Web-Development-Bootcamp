var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/blog_demo");

// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
	// an array of posts, and it has to denote the shcema name and not the model
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
// 	email: "hermione@hogwarts.edu",
// 	name: "Hermione Granger"
// });
// newUser.posts.push({
// 	title: "How to brew polyjuice potion",
// 	content: "Just kidding. Go to potions class to learn it."
// });
// newUser.save(function(err, user) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "REflections on Apples",
// 	content: "They are delicious"
// });
// newPost.save(function(err, post) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

// User.findOne({name: "Hermione Granger"}, function(err, user) {
// 	if(err) {
// 		// console.log(err);
// 	} else {
// 		// console.log(user);
// 		user.posts.push({
// 			title: "3 Things I really hate",
// 			content: "Voldemort. Voldemort. Voldemort"
// 		});
// 		user.save(function(err, user) {
// 			if(err) {
// 				console.log(err);
// 			} else {
// 				console.log(user);
// 			}
// 		});
// 	}
// });
