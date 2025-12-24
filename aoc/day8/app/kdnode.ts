import { Point } from "./point.js";

export class KDNode {
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

    public render(): string {
        const axis = ["x", "y", "z"][this.depth % 3];
        let result = `${this.point.render()} (${axis})\n`;

        if (this.left) {
            result += this.indent(`L : ${this.left.render()}`);
        }

        if (this.right) {
            result += this.indent(`R: ${this.right.render()}`);
        }

        return result;
    }

    private indent(text: string): string {
        return text.split('\n')
            .map(line => line ? `\t${line}` : line)
            .join('\n');
    }
}

