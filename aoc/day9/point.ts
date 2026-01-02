export class Point {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public calculateArea(other: Point): number {
        return (Math.abs(other.x - this.x) + 1) * (Math.abs(other.y - this.y) + 1);
    }
}

