import { createInterface } from "readline/promises";
import { open } from "fs/promises";
import { stdin, stdout } from "process";
import { resolve, normalize } from "path";
import { EOL } from "os";
import { Sweeper } from "./sweeper.js";

using reader = createInterface({ input: stdin, output: stdout });
const filePath = await reader.question("Filepath:");

const cleanPath = normalize(filePath.trim());
const absolutePath = resolve(cleanPath);

const file = await open(absolutePath);
const grid = await file.readFile("utf8").then(f => f.split(EOL));
file.close();

const sweeper = new Sweeper();
const result = sweeper.sweep(grid);

console.log(result);
process.exit(0);

