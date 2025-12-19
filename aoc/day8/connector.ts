type Result = {
    part1: 0
}

export class Connector {
    private readonly _result: Result;

    constructor() {
        this._result = {
            part1: 0
        }
    }


    // TODO: Basically nearest neighbour calc, try a K-D tree
    public connect(input: Array<string>): Result {
        const points = input.map(i => {
            var points = i.split(",").map(n => parseInt(n));

            return new Point(points[0], points[1], points[2])
        });

        return this._result;
    }
}

class Point {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public getDistanceFrom(point: Point): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }
}

class KDTree {
}
