import { createInterface } from "readline/promises";
import { open } from "fs/promises";
import { stdin, stdout } from "process";
import { resolve, normalize } from "path";
import { Validator } from "./validator.js";

using reader = createInterface({ input: stdin, output: stdout });
const filePath = await reader.question("Filepath:");

const cleanPath = normalize(filePath.trim());
const absolutePath = resolve(cleanPath);

const file = await open(absolutePath);

const input = await file.readFile("utf8").then(content => content.split(','))
file.close();

const validator = new Validator();

const result = validator.validate(input);

console.log(result);
process.exit(0);
