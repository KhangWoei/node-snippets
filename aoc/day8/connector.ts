import { Console } from "console";

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

class KDNode {
    public point: Point;
    public left: KDNode | null;
    public right: KDNode | null;
    public depth: number;

    constructor(point: Point, left: KDNode | null, right: KDNode | null, depth: number) {
        this.point = point;
        this.left = left;
        this.right = right;
        this.depth = depth;
    }
}

class KDTree {
    public readonly _root: KDNode;

    private constructor(root: KDNode) {
        this._root = root;
    }

    public static Create(input: Array<Array<number>>): KDTree {
        const root = this.CreateNode(input, 0);

        if (root) {
            return new KDTree(root);
        }

        throw new Error("No suitable tree found");
    }

    private static CreateNode(input: Array<Array<number>>, depth: number = 0): KDNode | null {
        if (input.length === 0) {
            return null;
        }

        const axis = depth % input[0].length;
        const medianIndex = Math.floor(input.length / 2);

        const median = this.Quickselect(input, 0, input.length - 1, medianIndex, axis);

        const left = this.CreateNode(input.slice(0, medianIndex), depth + 1);
        const right = this.CreateNode(input.slice(medianIndex + 1, input.length), depth + 1);

        return new KDNode(median, left, right, depth);
    }

    private static Quickselect(input: Array<Array<number>>, left: number, right: number, target: number, axis: number): Point {
        if (left === right) {
            const point = input[left];
            return new Point(point[0], point[1], point[2]);
        }

        const pivotIndex = this.Partition(input, left, right, axis);

        if (target < pivotIndex) {
            return this.Quickselect(input, left, pivotIndex - 1, target, axis);
        } else if (target > pivotIndex) {
            return this.Quickselect(input, pivotIndex + 1, right, target, axis);
        }

        const median = input[pivotIndex];
        return new Point(median[0], median[1], median[2]);
    }

    private static Partition(input: Array<Array<number>>, left: number, right: number, axis: number): number {
        const pivot = input[right][axis];
        let tracker = left;

        for (let index = left; index < right; index++) {
            if (input[index][axis] <= pivot) {
                Swap(tracker, index);
                tracker++;
            }
        }

        Swap(tracker, right);
        return tracker;

        function Swap(l: number, r: number): void {
            const temp = input[l];
            input[l] = input[r];
            input[r] = temp;
        }
    }
}
