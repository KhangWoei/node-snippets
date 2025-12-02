import { describe, expect, test } from "vitest"
import { Validator } from "./validator.js";

describe("validator", () => {
    test("no results when range is empty", () => {
        const validator = new Validator();
        const result = validator.validateRange("");
        expect(result.length).toBe(0);
    });

    test.each([
        { range: "11-22", expected: [11, 22] },
        { range: "95-115", expected: [99] },
        { range: "998-1012", expected: [1010] },
        { range: "1188511880-1188511890", expected: [1188511885] },
        { range: "1698522-1698528", expected: [] },
    ])("$range should have invalid ids $expected", ({ range, expected }) => {
        const validator = new Validator();

        const result = validator.validateRange(range);

        expect(result).toEqual(expected);
    });
})

