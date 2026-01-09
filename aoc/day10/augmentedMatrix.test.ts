import { describe, expect, test } from "vitest"
import { MachineBuilder } from "./machineBuilder.js";
import { AugmentedMatrix } from "./augmentedMatrix.js";
import { GaussianEliminationCalculator } from "./gaussianEliminationCalculator.js";

describe("gaussianEliminationCalculator", () => {
    test.each([
        {
            input: "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}",
            expected: {
                coefficients: [
                    [0, 0, 0, 0, 1, 1],
                    [0, 1, 0, 0, 0, 1],
                    [0, 0, 1, 1, 1, 0],
                    [1, 1, 0, 1, 0, 0]
                ],
                augment: [3, 5, 4, 7]
            }
        }
    ])("", ({ input, expected }) => {
        const machine = MachineBuilder.Parse(input);
        const matrix = AugmentedMatrix.fromMachine(machine);
        console.log(matrix);
        expect(matrix).toMatchObject(expected);
    });
});
