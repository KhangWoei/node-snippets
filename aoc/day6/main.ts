import { createInterface } from "readline/promises";
import { open } from "fs/promises";
import { stdin, stdout } from "process";
import { resolve, normalize } from "path";
import { Compactor } from "./compactor.js";
import { EOL } from "os";

using reader = createInterface({ input: stdin, output: stdout });
const filePath = await reader.question("Filepath:");

const cleanPath = normalize(filePath.trim());
const absolutePath = resolve(cleanPath);

const file = await open(absolutePath);
const trash = await file.readFile("utf8").then(f => f.split(EOL));

const compactor = new Compactor();
const result = compactor.compact(trash);

console.log(result);
file.close();
process.exit(0);
