import { KDNode } from "./KDNode.js";
import { Point } from "./point.js";

export class KDTree {
    public readonly _root: KDNode;

    private constructor(root: KDNode) {
        this._root = root;
    }

    public static create(input: Array<Array<number>>): KDTree {
        const root = this.createNode(input, 0);

        if (root) {
            return new KDTree(root);
        }

        throw new Error("No suitable tree found");
    }

    private static createNode(input: Array<Array<number>>, depth: number = 0): KDNode | null {
        if (input.length === 0) {
            return null;
        }

        const axis = depth % input[0].length;
        const medianIndex = Math.floor(input.length / 2);

        const median = this.quickselect(input, 0, input.length - 1, medianIndex, axis);

        const left = this.createNode(input.slice(0, medianIndex), depth + 1);
        const right = this.createNode(input.slice(medianIndex + 1, input.length), depth + 1);

        return new KDNode(median, left, right, depth);
    }

    private static quickselect(input: Array<Array<number>>, left: number, right: number, target: number, axis: number): Point {
        if (left === right) {
            const point = input[left];
            return new Point(point[0], point[1], point[2]);
        }

        const pivotIndex = this.partition(input, left, right, axis);

        if (target < pivotIndex) {
            return this.quickselect(input, left, pivotIndex - 1, target, axis);
        } else if (target > pivotIndex) {
            return this.quickselect(input, pivotIndex + 1, right, target, axis);
        }

        const median = input[pivotIndex];
        return new Point(median[0], median[1], median[2]);
    }

    private static partition(input: Array<Array<number>>, left: number, right: number, axis: number): number {
        const pivot = input[right][axis];
        let tracker = left;

        for (let index = left; index < right; index++) {
            if (input[index][axis] <= pivot) {
                swap(tracker, index);
                tracker++;
            }
        }

        swap(tracker, right);
        return tracker;

        function swap(l: number, r: number): void {
            const temp = input[l];
            input[l] = input[r];
            input[r] = temp;
        }
    }
}
