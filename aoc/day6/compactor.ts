type Result = {
    part1: number
}

export class Compactor {
    private readonly _result: Result;

    constructor() {
        this._result = {
            part1: 0
        }
    }

    public compact(trash: Array<string>): Result {

        return this._result;
    }
}
