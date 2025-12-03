import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

async function main() {
	const stream = createReadStream("../input.txt", "utf-8");
	const scanner = createInterface({
		input: stream,
		crlfDelay: Infinity,
	});

	var position: number = 50;
	var count: number = 0;

	for await (const line of scanner) {
		console.log(line);
		const dir = line[0];
		const mag = Number(line.substring(1));

		// Accounts for multi-revolutions i.e. L485 = 4 extra times hitting 0
		count += Math.floor(mag / 100);
		const m = mag % 100;

		if (dir === "L") {
			position -= m;
		} else {
			position += m;
		}

		// Do counting/wrapping logic only when needed
		if (position > 99 || position < 0 || position === 0) {
			// Doesn't count if we started from zero and went below
			if (position !== -m) count++;

			// Wraps 118 down to 18
			position = position % 100;

			// Wrap around from -5 to 95
			if (position < 0) {
				position = 100 + (position % 100);
			}
		}

		console.log(position);
	}

	console.log(`finish: ${count}`);
}

main();
