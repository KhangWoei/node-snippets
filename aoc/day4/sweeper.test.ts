import { describe, test, expect } from "vitest"
import { Sweeper } from "./sweeper.js";

describe("Sweeper", () => {
    test("sweep should return number of accessible rolls", () => {
        const sweeper = new Sweeper();
        const grid = new Array<string>();

        const actual = sweeper.sweep(grid);

        expect(actual).toBe(0);
    });
});
