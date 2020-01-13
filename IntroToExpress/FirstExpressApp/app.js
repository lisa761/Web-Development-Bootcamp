var express = require("express");
var app = express();

// req is request and res is response and they are object names(that are variable), so we could call it rq, rs if we wish but we go with the more standard and commonly used req and res

// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!!"); 
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
    console.log("SOMEONE MADE A REQUEST TO /DOG!!!")
    res.send("MEOW!"); 
});

app.get("/r/:subredditName", function(req, res){
	var subreddit = req.params.subredditName;
    console.log(req.params);
    res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!"); 
});

// : indicates patterns

app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    console.log(req.params);
    res.send("WELCOME TO THE COMMENTS PAGE!"); 
});

// for all the get requests that are other than what we have defined for
app.get("*", function(req, res){
 	res.send("YOU ARE A STAR!!!"); 
});
// the order matters, therefore this * should be the last, as it actually means all, and when checking in order then the route which reach this path only if its not one of the routes we have defined.

// there are route parameters that are also called route paths which are used to show pattern in different as URLs as big projects have a lot of URLs and you cannot possibly write get request for all of them, and on top of that, for sites where there are posts, new ones are assigned and therefore cannot be anticipated

// Tell express to listen for requests (start server)
app.listen(3000, function() {
	console.log("SERVER LISTENING!");
})