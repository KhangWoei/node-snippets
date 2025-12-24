import { KDNode } from "./kdnode.js";
import { Point } from "./point.js";

export class KDTree {
    public readonly _root: KDNode;

    constructor(root: KDNode) {
        this._root = root;
    }

    public findNearestNeighbour(target: Point): Point {
        const queued = new Set<KDNode>();
        const stack = new Array<KDNode>();

        let current: KDNode | null = this._root;

        while (current) {
            stack.push(current);
            queued.add(current);

            const axis: number = current.depth % 3;

            current = target.getAxis(axis) < current.point.getAxis(axis)
                ? current.left
                : current.right;
        }

        let best: { node: KDNode, distance: number } | null = null;
        while (stack.length > 0) {
            const node = stack.pop()!;

            if (node.point.isSamePoint(target)) {
                continue;
            }

            const distance = node.point.getDistanceFrom(target);

            if (!best || distance <= best.distance) {
                best = { node: node, distance: distance };
            }

            const axis = node.depth % 3;
            const distanceToPlane = Math.abs(target.getAxis(axis) - node.point.getAxis(axis));

            if (distanceToPlane < best.distance) {
                if (node.left && !queued.has(node.left)) {
                    stack.push(node.left);
                    queued.add(node.left);
                }

                if (node.right && !queued.has(node.right)) {
                    stack.push(node.right);
                    queued.add(node.right);
                }
            }
        }

        if (!best) {
            throw new NoNearestNeighbourError("No valid neighbour found!");
        }

        return best.node.point;
    }

    public render(): string {
        return this._root.render();
    }
}

export class NoNearestNeighbourError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "NoNearestNeighbourError";
        Object.setPrototypeOf(this, NoNearestNeighbourError.prototype);
    }
}
