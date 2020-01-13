function average(arr) {
	var sum = 0;
	for(var i = 0; i < arr.length; i++)
		sum += arr[i];
	return sum / arr.length;
}

var scores1 = [90, 98, 89, 100, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

console.log(Math.round(average(scores1)) + "\n");
console.log(Math.round(average(scores2)) + "\n");