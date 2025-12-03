import { describe, bench } from "vitest"
import { Validator } from "./validator.js";

describe("part2 benchmarking", () => {
    bench("pattern perumutation", () => {
        const sequence = 2121212121;

        const validator = new Validator();

        validator.isInvalid3(sequence);
    }, { time: 100 })

    bench("string concatenation", () => {
        const sequence = 2121212121
        const validator = new Validator();

        validator.isInvalid3(sequence);
    }, { time: 100 })
})

