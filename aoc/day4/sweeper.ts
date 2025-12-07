import { argv0 } from "process";

export type Result = {
    part1: number
    part2: number
}

export class Sweeper {
    private readonly _result: Result;

    constructor() {
        this._result = {
            part1: 0,
            part2: 0
        }
    }

    public sweep(grid: Array<string>): Result {
        let firstScan = true;
        let rescanRequired = true;
        let currentGrid = grid;

        while (rescanRequired) {
            rescanRequired = false;
            let newGrid = new Array<string>();

            currentGrid.forEach((row, rowIndex) => {
                let newRow = "";
                for (let colIndex = 0; colIndex < row.length; colIndex++) {
                    if (row[colIndex] === "@"
                        && this.isAccessible(rowIndex, colIndex, currentGrid)) {
                        if (firstScan) {
                            this._result.part1++;
                        }
                        this._result.part2++;
                        newRow += ".";
                        rescanRequired = true;
                    } else {
                        newRow += row[colIndex];
                    }

                }

                newGrid.push(newRow);
            });

            currentGrid = newGrid;
            firstScan = false;
        }

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
