
import { createInterface } from "readline/promises";
import { open } from "fs/promises";
import { stdin, stdout } from "process";
import { resolve, normalize } from "path";
import { Splitter } from "./splitter.js";
import { EOL } from "os";

using reader = createInterface({ input: stdin, output: stdout });
const filePath = await reader.question("Filepath:");

const cleanPath = normalize(filePath.trim());
const absolutePath = resolve(cleanPath);

const file = await open(absolutePath);
const map = await file.readFile("utf8").then(f => f.split(EOL).filter(s => !!s));

const splitter = new Splitter();
const result = splitter.split(map);

console.log(result);
file.close();
process.exit(0);
