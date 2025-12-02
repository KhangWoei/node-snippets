type Result = {
    part1: number
}
export class Validator {
    constructor() {
    }

    public validate(input: Iterable<string>): Result {
        const result = {
            part1: 0
        }

        for (const range of input) {
            result.part1 += this.validateRange(range).reduce((acc, current) => acc + current, 0);
        }

        return result;
    }

    public validateRange(range: string): Array<number> {
        const result = new Array<number>;

        const ranges = range.split("-").map(r => parseInt(r));
        Array.from({ length: (ranges[1] - ranges[0]) + 1 }, (_, index) => index + ranges[0]).forEach(id => {
            if (this.isValid(id)) {
                return;
            }

            result.push(id);
        });

        return result;
    }

    public isValid(id: number): boolean {
        var strId = id.toString();

        return !sequenceEqual(strId.slice(0, strId.length / 2), strId.slice(strId.length / 2, strId.length));

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
}
