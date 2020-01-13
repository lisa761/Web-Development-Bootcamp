var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal/", function(req, res) {
	var sounds = {
		pig : "'Oink'",
		cow : "'Moo'",
		dog : "'Woof Woof!'",
		cat : "'I hate you human'",
		goldfish : "'..."
	}
	// var str;
	// if(req.params.animal == "pig") {
	// 	str = "'Oink'";
	// }
	// else if(req.params.animal == "cow") {
	// 	str = "'Moo'";
	// }
	// else if(req.params.animal == "dog") {
	// 	str = "'Woof Woof!'";
	// }
	res.send("The " + req.params.animal + " says " + sounds[req.params.animal.toLowerCase()]);
});

app.get("/repeat/:string/:number/", function(req, res) {
	var n = Number(req.params.number);
	var str = "";
	for(var i = 0; i < n; i++) {
		str += req.params.string + " ";
	}
	// you cannot send res multiple times like you were trying to do in the old for loop where you iterated and sent the response n times
	res.send(str);
});

app.get("*", function(req, res) {
	res.send("Sorry page not found...What are you doing with your life?");
});

app.listen(3000, function() {
	console.log("SERVER LISTENING");
});