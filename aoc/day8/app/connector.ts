import { KDTree } from "./kdtree.js"
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

        const tree = KDTree.Create(points);

        console.log(tree);

        return this._result;
    }
}

