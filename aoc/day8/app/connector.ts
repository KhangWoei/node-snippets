import { KDTree } from "./kdtree.js"
import { KDTreeFactory } from "./kdtree_factory.js"

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


    public connect(input: Array<string>): Result {
        const points = input.map(i => {
            return i.split(",").map(n => parseInt(n));
        });

        const tree = KDTreeFactory.create(points);

        return this._result;
    }

    private calculateCircuits(tree: KDTree): [Array<number>, Array<number>] {
        // 1. Maintain a unique collection of all existing pairs

        // 2. Iterate through each point and find it's nearest neighbour and add the pair into 1.

        return [[], []];
    }
}

