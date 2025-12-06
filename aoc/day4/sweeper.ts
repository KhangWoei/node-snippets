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
        return this._result;
    }
}
