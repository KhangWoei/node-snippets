import { createInterface } from "readline/promises";
import { open } from "fs/promises";
import { stdin, stdout } from "process";
import { resolve, normalize } from "path";
import { Theater } from "./theater.js";
import { Point } from "./point.js";

using reader = createInterface({ input: stdin, output: stdout });
const filePath = await reader.question("Filepath:");

const cleanPath = normalize(filePath.trim());
const absolutePath = resolve(cleanPath);

const file = await open(absolutePath);
const points = new Array<Point>();

for await (const line of file.readLines()) {
    const parsedLine = line.split(",").map(x => parseInt(x));
    const point = new Point(parsedLine[0], parsedLine[1]);

    points.push(point);
}

const theater = new Theater();
const result = theater.decorate(points);

console.log(result);
file.close();
process.exit(0);

