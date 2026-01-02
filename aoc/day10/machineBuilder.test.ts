import { describe, expect, test } from "vitest"
import { MachineBuilder } from "./machineBuilder.js";

describe("machineBuilder", () => {
    test.each([
        {
            input: "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}",
            expected: {
                indicators: [false, true, true, false],
                buttons: [
                    [3],
                    [1, 3],
                    [2],
                    [2, 3],
                    [0, 2],
                    [0, 1]
                ],
                joltage: [3, 5, 4, 7]
            }
        }
    ])("", ({ input, expected }) => {
        const machine = MachineBuilder.Parse(input);

        expect(machine).toMatchObject(expected);
    });
});
