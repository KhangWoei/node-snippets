type Result = {
    part1: number
    part2: number
}

export class Validator {
    private readonly _result: Result;

    constructor() {
        this._result = {
            part1: 0,
            part2: 0
        }
    }

    public validate(input: Iterable<string>): Result {
        for (const range of input) {
            this.validateRange(range);
        }

        return this._result;
    }

    public validateRange(range: string): [number[], number[]] {
        const result: [number[], number[]] = [[], []];

        const ranges = range.split("-").map(r => parseInt(r));
        Array.from({ length: (ranges[1] - ranges[0]) + 1 }, (_, index) => index + ranges[0]).forEach(id => {
            if (this.isInvalid(id)) {
                this._result.part1 += id;
                result[0].push(id);
            }

            if (this.isInvalid2(id)) {
                this._result.part2 += id;
                result[1].push(id);
            }
        });

        return result;
    }

    public isInvalid(id: number): boolean {
        var strId = id.toString();

        return sequenceEqual(strId.slice(0, strId.length / 2), strId.slice(strId.length / 2, strId.length));

        function sequenceEqual(arr1: string, arr2: string): boolean {
            if (arr1.length !== arr2.length) {
                return false;
            }

            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) {
                    return false;
                }
            }

            return true;
        }
    }

    public isInvalid2(id: number): boolean {
        var strId = id.toString();

        for (let patternLength = 1; patternLength <= strId.length / 2; patternLength++) {
            if (strId.length % patternLength !== 0) {
                continue;
            }

            const pattern = strId.substring(0, patternLength);
            if (pattern.repeat(strId.length / patternLength) === strId) {
                return true;
            }
        }

        return false;
    }
}

