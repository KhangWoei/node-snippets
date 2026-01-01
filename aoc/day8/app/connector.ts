import { Point } from "./point.js"

type Result = {
    part1: 0,
    part2: 0
}

type Pair = {
    left: Point,
    right: Point
    distance: number
}

export class Connector {
    private readonly _result: Result;

    constructor() {
        this._result = {
            part1: 0,
            part2: 0
        }
    }


    public connect(input: Array<string>, limit: number): Result {
        const points = input.map(i => {
            const coordinates = i.split(",").map(n => parseInt(n));
            return new Point(coordinates[0], coordinates[1], coordinates[2]);
        });

        const heap = new Array<Pair>();

        for (let i = 0; i < points.length; i++) {
            const current = points[i];

            for (let j = i + 1; j < points.length; j++) {
                const candidate = {
                    left: current,
                    right: points[j],
                    distance: current.getDistanceFrom(points[j])
                };

                heap.push(candidate);
            }
        }

        heap.sort((a, b) => a.distance - b.distance);

        const circuits = this.buildCircuits(heap.slice(0, limit))
            .sort((a, b) => b.size - a.size)
            .slice(0, 3);
        this._result.part1 += circuits.reduce((acc, curr) => acc * curr.size, 1);

        const linkingConnection = this.calculateLinkingConnection(heap, points.length);
        this._result.part2 += linkingConnection.left.x * linkingConnection.right.x;

        return this._result;
    }

    private buildCircuits(connections: Array<Pair>): Array<Set<Point>> {
        let circuits = new Array<Set<Point>>();

        for (const pair of connections) {
            const matchingCircuit = circuits.filter(c => c.has(pair.left) || c.has(pair.right));

            if (matchingCircuit.length === 0) {
                circuits.push(new Set<Point>([pair.left, pair.right]));
            } else {
                const mergedCircuit = new Set([
                    pair.left,
                    pair.right,
                    ...matchingCircuit.flatMap(c => [...c])
                ]);

                circuits = circuits.filter(c => !matchingCircuit.includes(c));
                circuits.push(mergedCircuit);
            }
        }

        return circuits;
    }

    private calculateLinkingConnection(connections: Array<Pair>, junctionBoxes: number): Pair {
        let circuits = new Array<Set<Point>>();

        for (const pair of connections) {
            const matchingCircuit = circuits.filter(c => c.has(pair.left) || c.has(pair.right));

            if (matchingCircuit.length === 0) {
                circuits.push(new Set<Point>([pair.left, pair.right]));
            } else {
                const mergedCircuit = new Set([
                    pair.left,
                    pair.right,
                    ...matchingCircuit.flatMap(c => [...c])
                ]);

                circuits = circuits.filter(c => !matchingCircuit.includes(c));
                circuits.push(mergedCircuit);
            }

            if (circuits.length === 1 && circuits[0].size === junctionBoxes) {
                return pair;
            }
        }

        throw new Error("Unable to form a single circuit with all junction boxes");
    }
}
