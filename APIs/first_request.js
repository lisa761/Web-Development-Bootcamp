// var request = require("request");
// request("https://www.goggle.com", function(error, response, body) {
// 	if(!error && response.statusCode == 200) {
// 		console.log(body);
// 	}
// });

// var request = require("request");
// request("https://www.google.com", function(error, response, body) {
// 	if(error) {
// 		console.log("SOMETHING WENT WRONG!");
// 		console.log(error);
// 	}
// 	else {
// 		if(response.statusCode == 200) {
// 			// THINGS WORKED!
// 			console.log("body");
// 		}
// 	}
// });

// var request = require("request");
// request("https://jsonplaceholder.typicode.com/users/1", function(error, response, body) {
// 	// eval(require("locus"));
// 	if(!error && response.statusCode == 200) {
// 		var parsedData = JSON.parse(body);
// 		// this is to convert the string that we recieve as body into a JSON object so we can acces the parts we want
// 		console.log(parsedData.name + " lives in " + parsedData.address.city);
// 	}
// });


// ES6
const rp = require("request-promise");
rp('https://jsonplaceholder.typicode.com/users/1')
	.then((body) => {
		const parsedData = JSON.parse(body);
		console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
	})
	.catch((error) => {
		console.log("Error! ", error);
	});