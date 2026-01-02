import { describe, expect, test } from "vitest";
import { Machine } from "./machine.js";
import { MachineBuilder } from "./machineBuilder.js";

describe("machine", () => {
    test.each([
        {
            input: "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}",
            expected: 2
        },
        {
            input: "[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}",
            expected: 3
        },
        {
            input: "[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}",
            expected: 2
        }
    ])("calculateOptimalConfiguration, given: $input, expect: $expected", ({ input, expected }) => {
        const machine = MachineBuilder.Parse(input);

        const actual = machine.calculateOptimalConfiguration();

        expect(actual).toBe(expected);
    });
});

