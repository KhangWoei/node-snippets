import { describe, test, expect } from "vitest";
import { Booster } from "./booster.js";

describe("booster", () => {

    test.each([
        { bank: "987654321111111", expected: 98 },
        { bank: "811111111111119", expected: 89 },
        { bank: "234234234234278", expected: 78 },
        { bank: "818181911112111", expected: 92 },
    ])("getLargestJoltage, given $bank, largest joltage should be $expected", ({ bank, expected }) => {
        const booster = new Booster();

        const actual = booster.getLargestJoltage(bank);

        expect(actual).toBe(expected);
    });


    test.each([
        { bank: "987654321111111", expected: 987654321111 },
        { bank: "811111111111119", expected: 811111111119 },
        { bank: "234234234234278", expected: 434234234278 },
        { bank: "818181911112111", expected: 888911112111 },
    ])("getLargestJoltage2, given $bank, largest joltage should be $expected", ({ bank, expected }) => {
        const booster = new Booster();

        const actual = booster.getLargestJoltage2(bank);

        expect(actual).toBe(expected);
    });
});
