import { describe, expect, test } from "vitest"
import { Point } from "./point.js"
import { Theater } from "./theater.js"

describe("theater", () => {
    test("decorate, largest area using example problem should be 50 ", () => {
        const input = [
            new Point(7, 1),
            new Point(11, 1),
            new Point(11, 7),
            new Point(9, 7),
            new Point(9, 5),
            new Point(2, 5),
            new Point(2, 3),
            new Point(7, 3),
        ]
        const theater = new Theater();

        const actual = theater.decorate(input);

        expect(actual).toEqual(50);
    });

    test("redGreenDecoration, largest area using example problem should be 24", () => {
        const input = [
            new Point(7, 1),
            new Point(11, 1),
            new Point(11, 7),
            new Point(9, 7),
            new Point(9, 5),
            new Point(2, 5),
            new Point(2, 3),
            new Point(7, 3),
        ]
        const theater = new Theater();

        const actual = theater.redGreenDecoration(input);

        expect(actual).toEqual(24);
    });
});
