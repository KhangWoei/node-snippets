export class Point {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public getDistanceFrom(point: Point): number {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2) + Math.pow(this.z - point.z, 2));
    }

    public render(): string {
        return `[${this.x}, ${this.y}, ${this.z}]`;
    }

    public getAxis(axis: number): number {
        switch (axis) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            default:
                throw new Error("Out of bounds");
        }
    }

    public isSamePoint(point: Point): boolean {
        return this.x === point.x
            && this.y === point.y
            && this.z === point.z;
    }
}

export class OutOfBoundsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OutOfBoundsError";
        Object.setPrototypeOf(this, OutOfBoundsError.prototype);
    }
}
