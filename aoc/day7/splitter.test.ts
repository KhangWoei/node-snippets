import { describe, test, expect } from "vitest";
import { Splitter } from "./splitter.js";

describe("splitter", () => {
    test("example problem, should be split 21 times", () => {
        const input =
            [
                ".......S.......",
                "...............",
                ".......^.......",
                "...............",
                "......^.^......",
                "...............",
                ".....^.^.^.....",
                "...............",
                "....^.^...^....",
                "...............",
                "...^.^...^.^...",
                "...............",
                "..^...^.....^..",
                "...............",
                ".^.^.^.^.^...^.",
                "..............."
            ];
        const splitter = new Splitter();

        const result = splitter.split(input);

        expect(result.part1).toBe(21);
    });
});

