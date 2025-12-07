import { describe, test, expect } from "vitest"
import { Compactor } from "./compactor.js"

describe("compactor", () => {
    test("test", () => {
        const compactor = new Compactor();
        const input = [
            "123 328 51 64",
            "45 64 387 23",
            "6 29 215 314",
            "* + * +"
        ]

        const actual = compactor.compact(input);

        expect(actual.part1).toBe(4277556);
    });
});
