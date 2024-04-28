import * as fs from 'node:fs/promises';

const text = await fs.readFile("./input.txt", { encoding: 'utf8' });

const times = text.split(":")[1].trim().split("\r")[0].split(" ").filter(x => x !== "").map(x => Number(x));
const records = text.split(":")[2].trim().split("\r")[0].split(" ").filter(x => x !== "").map(x => Number(x));


function evaluateRound(time, record) {
	let solutions = 0;
	for (let secondsHeld = 0; secondsHeld < time; secondsHeld++) {
		if (secondsHeld * (time-secondsHeld) > record) {
			solutions++;
		}
	}
	return solutions;
}

console.time("parse");

let solutions = [];
for (let i = 0; i < times.length; i++) {
	solutions.push(evaluateRound(times[i], records[i]));
}

let product = solutions.reduce((accumulator, x) => accumulator * x);
console.timeEnd("parse");
console.log(product);