type Result = {
    part1: number
    part2: number
}

export class IngrediantTester {
    private readonly _result: Result;

    constructor() {
        this._result = {
            part1: 0,
            part2: 0
        }
    }

    public async calculateFreshIngrediants(input: AsyncIterable<string>): Promise<Result> {
        let freshIngrediantRanges = new Array<Range>();
        let buildingRange = true;
        for await (const line of input) {
            if (buildingRange) {
                if (line) {
                    const parsedRange = line.split("-").map(r => parseInt(r));
                    let range = new Range(parsedRange[0], parsedRange[1]);
                    const newRanges = new Array<Range>();

                    freshIngrediantRanges.forEach(r => {
                        if (r.overlaps(range)) {
                            range = Range.Combine(r, range);
                        } else {
                            newRanges.push(r);
                        }
                    });

                    newRanges.push(range);
                    freshIngrediantRanges = newRanges;
                } else {
                    buildingRange = false;
                }

                continue;
            }


            if (freshIngrediantRanges.some(r => r.contains(parseInt(line)))) {
                this._result.part1++;
            }
        }

        this._result.part2 = freshIngrediantRanges.reduce((acc, curr) => acc + curr.length(), 0);

        return this._result;
    }
}

class Range {
    public start: number;
    public end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    public overlaps(target: Range): boolean {
        return this.start <= target.end && this.end >= target.start;
    }

    public contains(input: number): boolean {
        const temp = input >= this.start && input <= this.end;
        return temp;
    }

    public length(): number {
        return this.end - this.start + 1;
    }

    public static Combine(range1: Range, range2: Range) {
        return new Range(Math.min(range1.start, range2.start), Math.max(range1.end, range2.end));
    }
}
