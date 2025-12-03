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

		const m = mag % 100;
		if (dir === "L") {
			position -= m;
		} else {
			position += m;
		}

		if (position > 99 || position < 0) {
			position = position % 100;
			if (position < 0) {
				position = 100 + (position % 100);
			}
		}

		console.log(position, position % 100);

		if (position === 0) count++;
	}

	console.log(`finish: ${count}`);
}

main();
