import * as fs from 'node:fs/promises';

const text = await fs.readFile("./input.txt", { encoding: 'utf8' });

const time = Number(text.split(":")[1].trim().split("\r")[0].split(" ").filter(x => x !== "").reduce((accumulator, x) => accumulator + x));
const record = Number(text.split(":")[2].trim().split("\r")[0].split(" ").filter(x => x !== "").reduce((accumulator, x) => accumulator + x));

//	An important observation is that the two input variables TIME_HELD and TIME_TRAVELED are inversely proportional
//	We are checking for TIME_HELD where TIME_HELD * TIME_TRAVELED is greater than RECORD
//	TIME_TRAVELED is given by TOTAL_TIME - TIME_HELD because as mentioned, they are inversely proportional
//	This means that it doesn't really matter which we solve for, but more importantly that the result is symmetrical

//	Consider the formula TIME_HELD * (TOTAL_TIME - TIME_HELD) > RECORD
//	TOTAL_TIME and RECORD are known constant values, only TIME_HELD is variable
//	If the TOTAL_TIME is 7 and the RECORD 9 it would look like: x(7-x) > 9

//	If we imagine all the inputs for TIME_HELD on the X axis, DISTANCE on the Y axis, and the RECORD as a horizontal line we need to cross,
//	then the resulting formula will create a parabola that crosses the RECORD at two places centered on the middle
//	The formula to find those two locations is the quadratic formula. In the example above we rearrange: -x^2 + 7x - 9 = 0

function calculateQuadratic(totalTime, record) {
	//	Put the variables into the quadratic formula
	//	- TIME_HELD^2 + (TOTAL_TIME * TIME_HELD) - RECORD  == 0
	const a = -1;
	const b = totalTime;
	const c = -record;

	//	Calculate the discriminant
	const d = (b * b) - (4 * a * c);

	const sqrtD = Math.sqrt(d);
	const sol1 = (-b - sqrtD) / (2 * a);
	const sol2 = (-b + sqrtD) / (2 * a);

	//	Finally just floor the values and return the difference
	return Math.abs(Math.floor(sol1) - Math.floor(sol2));
}

console.time("calculate");
let solutions = calculateQuadratic(time, record);
console.timeEnd("calculate");

console.log(`Solutions: ${solutions}`);