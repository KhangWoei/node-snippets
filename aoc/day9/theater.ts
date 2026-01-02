import { Point } from "./point.js";

type Area = {
    point1: Point,
    point2: Point,
    area: number
}

type Interval = {
    start: number,
    end: number
}

export class Theater {

    constructor() { }

    public decorate(points: Array<Point>): number {
        let max = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < points.length; i++) {
            const current = points[i];

            for (let j = i + 1; j < points.length; j++) {
                const area = current.calculateArea(points[j]);

                max = Math.max(area, max);
            }
        }

        return max;
    }

    public redGreenDecoration(points: Array<Point>): number {
        const validTiles = fill(points);

        let max = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < points.length; i++) {
            const start = points[i];

            for (let j = i + 1; j < points.length; j++) {
                const end = points[j];
                const area = start.calculateArea(end);

                if (area <= max) {
                    continue;
                }

                if (isValidRectangle(start, end, validTiles)) {
                    max = Math.max(start.calculateArea(end), max);
                }
            }
        }

        return max;

        function fill(points: Array<Point>): Map<number, Array<Interval>> {
            const minY = Math.min(...points.map(p => p.y));
            const maxY = Math.max(...points.map(p => p.y));

            const scanlines = new Map<number, Array<Interval>>();

            for (let y = minY; y <= maxY; y++) {
                const intervals: Interval[] = [];
                const intersections: number[] = [];

                for (let i = 0; i < points.length; i++) {
                    const current = points[i];
                    const next = points[(i + 1) % points.length];

                    if (current.y === next.y && y === current.y) {
                        intervals.push({
                            start: Math.min(current.x, next.x),
                            end: Math.max(current.x, next.x)
                        });
                        continue;
                    }

                    const minEdgeY = Math.min(current.y, next.y);
                    const maxEdgeY = Math.max(current.y, next.y);

                    if (y > minEdgeY && y <= maxEdgeY) {
                        const t = (y - current.y) / (next.y - current.y);
                        const intersectX = current.x + (t * (next.x - current.x));
                        intersections.push(intersectX);
                    }
                }

                intersections.sort((a, b) => a - b);

                for (let i = 0; i < intersections.length; i += 2) {
                    if (i + 1 < intersections.length) {
                        intervals.push({
                            start: Math.ceil(intersections[i]),
                            end: Math.floor(intersections[i + 1])
                        });
                    }
                }

                if (intervals.length > 0) {
                    intervals.sort((a, b) => a.start - b.start);
                    const merged: Interval[] = [intervals[0]];

                    for (let i = 1; i < intervals.length; i++) {
                        const last = merged[merged.length - 1];
                        const curr = intervals[i];

                        if (curr.start <= last.end + 1) {
                            last.end = Math.max(last.end, curr.end);
                        } else {
                            merged.push(curr);
                        }
                    }

                    scanlines.set(y, merged);
                }
            }

            return scanlines;
        }

        // function pointInPolygon(point: Point, polygon: Array<Point>): boolean {
        //     let inPolygon = false;
        //
        //     for (let i = 0; i < polygon.length; i++) {
        //         const current = polygon[i];
        //         const next = polygon[(i + 1) % polygon.length];
        //
        //         if ((current.y === next.y) && (point.y === current.y)) {
        //             const minX = Math.min(current.x, next.x);
        //             const maxX = Math.max(current.x, next.x);
        //
        //             if (point.x >= minX && point.x <= maxX) {
        //                 return true;
        //             }
        //
        //             continue;
        //         }
        //
        //         const minY = Math.min(current.y, next.y);
        //         const maxY = Math.max(current.y, next.y);
        //
        //         /*
        //          * Because we're drawing a horizontal line, we want to make sure that the origin of the ray is in edge's y boundary, and also to ensure that the edge itself isn't a line 
        //          */
        //         if (point.y > minY && point.y <= maxY) {
        //             /* Using the parametric equation of a straight line between two points
        //              * x(t) = x1 + t * (x2 - x1)
        //              * y(t) = y1 + t * (y2 - y1)
        //              *
        //              * Since we're drawing a horizontal line we want to first figure out `t` that satisfies point.y as that is where out line will sit 
        //              *
        //              * t = (point.y - y1) / (y2 - y1)
        //              *
        //              * Then we can figure out where in the line between (x1,y1) and (x2,y2) the horizontal line intersects by slotting (t) into x(t)
        //              *
        //              * x(t) = x1 + [(point.y - y1 / (y2-y1) * (x2 - x1)]
        //              */
        //             const t = (point.y - current.y) / (next.y - current.y);
        //             const intersectX = current.x + (t * (next.x - current.x));
        //
        //             if (point.x < intersectX) {
        //                 inPolygon = !inPolygon;
        //             }
        //         }
        //
        //     }
        //
        //     return inPolygon;
        // }

        function isValidRectangle(start: Point, end: Point, scanlines: Map<number, Array<Interval>>): boolean {
            const minX = Math.min(start.x, end.x);
            const maxX = Math.max(start.x, end.x);
            const minY = Math.min(start.y, end.y);
            const maxY = Math.max(start.y, end.y);

            for (let y = minY; y <= maxY; y++) {
                const intervals = scanlines.get(y);
                if (!intervals) {

                    return false;
                }

                let inRange = false;
                for (const interval of intervals) {
                    if (interval.start <= minX && interval.end >= maxX) {
                        inRange = true;
                        break;
                    }
                }

                if (!inRange) {
                    return inRange;
                }
            }

            return true;
        }
    }
}

