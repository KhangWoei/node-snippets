import { createInterface } from "readline/promises";
import { open } from "fs/promises";
import { stdin, stdout } from "process";
import { resolve, normalize } from "path";
import { EOL } from "os";
import { IngrediantTester } from "./ingrediantTester.js";

using reader = createInterface({ input: stdin, output: stdout });
const filePath = await reader.question("Filepath:");

const cleanPath = normalize(filePath.trim());
const absolutePath = resolve(cleanPath);

const file = await open(absolutePath);

const freshness = new IngrediantTester();
const result = await freshness.calculateFreshIngrediants(file.readLines());

console.log(result);
file.close();
process.exit(0);
