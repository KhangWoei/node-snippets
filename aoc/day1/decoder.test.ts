import { describe, expect, test } from "vitest"
import { Decoder } from "./decoder.js";

describe("decoder", () => {

    test.each([
        50,
        0,
        25
    ])("when no input should return 0", (initial) => {
        const actual = new Decoder(initial).decode("");
        expect(actual).toBe(0);
    });

    test.each([
        { initial: 5, commands: ["L5"], expected: 1 },
        { initial: 5, commands: ["L5", "R5", "L5"], expected: 2 },
        { initial: 5, commands: ["L105"], expected: 1 },
        { initial: 95, commands: ["R5"], expected: 1 },
        { initial: 95, commands: ["R5", "L5", "R5"], expected: 2 },
        { initial: 95, commands: ["R105"], expected: 1 },
    ])("should return amount of a command points at 0", ({ initial, commands, expected }) => {
        const actual = new Decoder(initial).decode(commands);
        expect(actual).toBe(expected);
    });

    test.each([
        { initial: 50, input: "", expected: 50 },
        { initial: 50, input: "L5", expected: 45 },
        { initial: 50, input: "R5", expected: 55 },
        { initial: 50, input: "L51", expected: 99 },
        { initial: 50, input: "R50", expected: 0 },
        { initial: 50, input: "R100", expected: 50 },
        { initial: 50, input: "L100", expected: 50 },
    ])("starting from $initial and rotating $input, should be $expected", ({ initial, input, expected }) => {
        const actual = new Decoder(initial)
            .rotate(input);

        expect(actual).toBe(expected);
    });
});
