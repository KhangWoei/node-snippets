import { describe, expect, test } from "vitest"
import { Validator } from "./validator.js";

describe("validator", () => {
    test("no results when range is empty", () => {
        const validator = new Validator();
        const result = validator.validateRange("");
        expect(result[0].length).toBe(0);
    });

    test.each([
        { range: "11-22", expected: [11, 22] },
        { range: "95-115", expected: [99] },
        { range: "998-1012", expected: [1010] },
        { range: "1188511880-1188511890", expected: [1188511885] },
        { range: "1698522-1698528", expected: [] },
        { range: "1212121212-1212121213", expected: [] }
    ])("$expected sequences in $range are built from digits that are repeated twice", ({ range, expected }) => {
        const validator = new Validator();

        const result = validator.validateRange(range);

        expect(result[0]).toEqual(expected);
    });

    test.each([
        { range: "11-22", expected: [11, 22] },
        { range: "95-115", expected: [99, 111] },
        { range: "998-1012", expected: [999, 1010] },
        { range: "1188511880-1188511890", expected: [1188511885] },
        { range: "1698522-1698528", expected: [] },
    ])("$expected sequences with $range are built from digites that repeated at least twice", ({ range, expected }) => {
        const validator = new Validator();

        const result = validator.validateRange(range);

        expect(result[1]).toEqual(expected);
    });
})
