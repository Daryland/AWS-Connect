# AWS-Connect-VanityNumbers
AWS Connect vanity number project

https://www.geeksforgeeks.org/how-to-generate-all-combinations-of-a-string-in-javascript/
let possibleCombinations = (str) => {
	let combinations = [];
	for (let i = 0; i < str.length; i++) {
		for (let j = i + 1; j < str.length + 1; j++) {
			combinations.push(str.slice(i, j));
		}
	}
	return combinations;
}
console.log(possibleCombinations('Dog'));


## Python trouble shooting
https://www.freecodecamp.org/news/how-to-handle-errors-in-python/
