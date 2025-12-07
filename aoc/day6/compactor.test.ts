import { describe, test, expect } from "vitest"
import { Compactor } from "./compactor.js"

describe("compactor", () => {
    test("should return sum of the accumulated operation on each column", () => {
        const compactor = new Compactor();
        const input = [
            "123 328  51 64",
            " 45 64  387 23",
            "  6 98  215 314",
            "* + * +"
        ]

        const actual = compactor.compact(input);

        expect(actual.part1).toBe(4277556);
    });

    test("should return sum of the accumulated operation on each column", () => {
        const compactor = new Compactor();
        const input = [
            "123 328  51 64",
            " 45 64  387 23",
            "  6 98  215 314",
            "* + * +"
        ]

        const actual = compactor.compact(input);

        expect(actual.part2).toBe(3263827);
    });
});
