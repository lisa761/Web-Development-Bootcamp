var express = require("express"),
	app     = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.redirect("/charts");
});

app.get("/charts", function(req, res) {
	res.render("charts");
});

app.listen(3000, function() {
	console.log("SERVER LISTENING!");
});