type Result = {
    part1: number
    part2: number
}

type Beam = "S" | "|";

export class Splitter {
    private readonly _result: Result;

    constructor() {
        this._result = {
            part1: 0,
            part2: 0
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
        const rows = map.length;
        const columns = map[0].length;

        const beamTrack = new Array<number>(columns);
        for (var column = 0; column < columns; column++) {
            beamTrack[column] = this.isBeam(map[0][column]) ? 1 : 0;
        }

        for (var row = 1; row < rows; row++) {
            var currentRow = map[row];

            for (var column = 0; column < columns; column++) {
                if (beamTrack[column]) {
                    if (currentRow[column] === "^") {
                        this._result.part1++;

                        let left = column - 1;
                        while (left >= 0) {
                            if (currentRow[left] === "^") {
                                this._result.part1++;
                                continue;
                            } else {
                                beamTrack[left] += beamTrack[column];
                                break;
                            }

                            left--;
                        }

                        let right = column + 1;
                        while (right < columns) {
                            if (currentRow[right] === "^") {
                                this._result.part1++;
                                continue;
                            } else {
                                beamTrack[right] += beamTrack[column];
                                break;
                            }

                            right++;
                        }

                        beamTrack[column] = 0;
                    }
                }
            }
        }

        this._result.part2 = beamTrack.reduce((acc, current) => acc += current, 0);

        return this._result;

        function traceBeam(cell: string): boolean {
            return cell === "^";

        }
    }

    private isBeam(value: string): value is Beam {
        return value === "S" || value === "|";
    }
}
