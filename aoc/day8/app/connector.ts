import { KDTree } from "./kdtree.js"
import { KDTreeFactory } from "./kdtree_factory.js"
import { Point } from "./point.js"

type Result = {
    part1: 0
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
            part1: 0
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

                if (heap.length < limit) {
                    heap.push(candidate);

                    if (heap.length === limit) {
                        heap.sort((a, b) => b.distance - a.distance);
                    }
                } else if (candidate.distance < heap[0].distance) {
                    heap[0] = candidate;

                    heap.sort((a, b) => b.distance - a.distance);
                }
            }
        }

        const circuits = this.buildCircuits(heap).sort((a, b) => b.size - a.size).slice(0, 3);
        this._result.part1 += circuits.reduce((acc, curr) => acc * curr.size, 1);

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
}
