import { createInterface } from "readline/promises";
import { open } from "fs/promises";
import { stdin, stdout } from "process";
import { resolve, normalize } from "path";
import { Connector } from "./connector.js";
import { EOL } from "os";

using reader = createInterface({ input: stdin, output: stdout });
const filePath = await reader.question("Filepath:");

const cleanPath = normalize(filePath.trim());
const absolutePath = resolve(cleanPath);

const file = await open(absolutePath);
const map = await file.readFile("utf8").then(f => f.split(EOL).filter(s => !!s));

const connector = new Connector();
const result = connector.connect(map);

console.log(result);
file.close();
process.exit(0);
