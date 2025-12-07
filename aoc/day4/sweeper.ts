import { argv0 } from "process";

export type Result = {
    part1: number
}

export class Sweeper {
    private readonly _result: Result;

    constructor() {
        this._result = {
            part1: 0
        }
    }

    public sweep(grid: Array<string>): Result {

        grid.forEach((row, rowIndex) => {
            for (let colIndex = 0; colIndex < row.length; colIndex++) {
                if (row[colIndex] === "@"
                    && this.isAccessible(rowIndex, colIndex, grid)) {
                    this._result.part1++;
                }
            }
        });

        return this._result;
    }
    private isAccessible(rowIndex: number, colIndex: number, grid: Array<string>): boolean {
        return (isRoll(rowIndex - 1, colIndex - 1) + isRoll(rowIndex - 1, colIndex) + isRoll(rowIndex - 1, colIndex + 1)
            + isRoll(rowIndex, colIndex - 1) + isRoll(rowIndex, colIndex + 1)
            + isRoll(rowIndex + 1, colIndex - 1) + isRoll(rowIndex + 1, colIndex) + isRoll(rowIndex + 1, colIndex + 1)) < 4

        function isRoll(row: number, column: number): number {
            return row < 0
                || row >= grid.length
                || column < 0
                || column >= grid[0].length
                || grid[row][column] !== "@"
                ? 0
                : 1
        }
    }
}
