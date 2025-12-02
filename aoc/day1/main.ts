import { createInterface } from "readline/promises";
import { open } from "fs/promises";
import { stdin, stdout } from "process";
import { resolve, normalize } from "path";
import { Decoder } from "./decoder.js";

using reader = createInterface({ input: stdin, output: stdout });
const filePath = await reader.question("Filepath:");

const cleanPath = normalize(filePath.trim());
const absolutePath = resolve(cleanPath);

const file = await open(absolutePath);
const decoder = new Decoder(50);
const result = await decoder.decodeAsync(file.readLines());
file.close();

console.log(result);
process.exit(0);

