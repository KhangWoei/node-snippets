type Result = {
    part1: number
}

export class Splitter {
    private readonly _result: Result;

    constructor() {
        this._result = {
            part1: 0
        }
    }

    /*
     * We want to Look/Scan two rows per iteration
     *  Row 1: Containing the beam
     *  Row 2: The row after the beams (Lookahead)
     *
     *  During lookahead, check if the current column has a beam, if it does resolve for 
     *   1. Split if there is a splitter, (increment count/result.part1)
     *   2. Pass through.
     *
     * After each iteration, bump the beam and lookahead, terminate when lookahead reaches the end.
    */
    public split(map: Array<string>): Result {
        return this._result;
    }
}
