import { Point } from "./point.js";

type Result = {
    part1: number,
    part2: number
}

type Area = {
    point1: Point,
    point2: Point,
    area: number
}

export class Theater {
    private readonly _result: Result;

    constructor() {
        this._result = {
            part1: 0,
            part2: 0
        }
    }

    public decorate(points: Array<Point>): Result {
        let max = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < points.length; i++) {
            const current = points[i];

            for (let j = i + 1; j < points.length; j++) {
                const area = current.caclulateArea(points[j]);

                max = Math.max(area, max);
            }
        }

        this._result.part1 = max;

        return this._result;
    }

    public redGreenDecoration(points: Array<Point>): Result {
        return this._result;
    }
}

