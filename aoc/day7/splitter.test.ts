import { describe, test, expect } from "vitest";
import { Splitter } from "./splitter.js";

describe("splitter", () => {
    test("part 1 example problem, should be split 21 times", () => {
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

    test("part 2 example problem, should end up on 40 timelines", () => {
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

        expect(result.part2).toBe(40);
    });
});

