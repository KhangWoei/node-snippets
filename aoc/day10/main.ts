import { createInterface } from "readline/promises";
import { stdin, stdout } from "process";
import { open } from "fs/promises";
import { resolve, normalize } from "path";
import { Manual } from "./manual.js";

using reader = createInterface({ input: stdin, output: stdout });
const filePath = await reader.question("Filepath:");

const cleanPath = normalize(filePath.trim());
const absolutePath = resolve(cleanPath);

const file = await open(absolutePath);

const manual = new Manual();
const result = await manual.process(file.readLines());

console.log(result);
file.close();
process.exit(0);

