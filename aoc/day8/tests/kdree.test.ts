import { describe, test, expect } from "vitest"
import { KDTree } from "../app/kdtree.js"
import { KDTreeFactory } from "../app/kdtree_factory.js";
import { Point } from "../app/point.js";

describe("kdtree", () => {
    test.each([
        {
            nodes: [
                [0, 0, 0],
                [1, 0, 0],
                [2, 0, 0],
                [3, 0, 0],
                [4, 0, 0],
                [5, 0, 0]
            ],
            target: new Point(0, 0, 0),
            expected: new Point(1, 0, 0)
        },
        {
            nodes: [
                [0, 0, 0],
                [3, 3, 3],
                [5, 5, 5]
            ],
            target: new Point(4, 4, 4),
            expected: new Point(3, 3, 3)
        },
        {
            nodes: [
                [0, 0, 0],
                [-3, -3, -3],
                [-5, -5, -5]
            ],
            target: new Point(-4, -4, -4),
            expected: new Point(-3, -3, -3)
        },
        {
            nodes: [
                [0, 0, 0],
                [3, 3, 3],
                [5, 5, 5]
            ],
            target: new Point(-4, -4, -4),
            expected: new Point(0, 0, 0)
        },
    ])("findNearestNeighbour, returns nearest point other than the node itself", ({ nodes, target, expected }: {
        nodes: number[][],
        target: Point,
        expected: Point
    }) => {
        const kdtree = KDTreeFactory.create(nodes);

        const actual = kdtree.findNearestNeighbour(target);

        expect(actual).toEqual(expected);
    });
});
