import { Point } from "./point.js";

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

