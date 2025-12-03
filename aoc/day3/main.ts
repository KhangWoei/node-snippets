import { createInterface } from "readline/promises";
import { open } from "fs/promises";
import { stdin, stdout } from "process";
import { resolve, normalize } from "path";
import { Booster } from "./booster.js";

using reader = createInterface({ input: stdin, output: stdout });
const filePath = await reader.question("Filepath:");

const cleanPath = normalize(filePath.trim());
const absolutePath = resolve(cleanPath);

const file = await open(absolutePath);

const booster = new Booster();
const result = await booster.boostAsync(file.readLines());

console.log(result);
process.exit(0);
