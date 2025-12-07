type Result = {
    part1: number
    part2: number
}

export class Compactor {
    private readonly _result: Result;

    constructor() {
        this._result = {
            part1: 0,
            part2: 0
        }
    }

    public compact(trash: Array<string>): Result {
        const problems = trash[trash.length - 1]
            .trimEnd()
            .split(" ")
            .filter(op => !!op)
            .map(op => new Problem(op));

        let max = 0;
        for (let rowIndex = 0; rowIndex < trash.length - 1; rowIndex++) {
            max = Math.max(trash[rowIndex].length, max);
            const columns = trash[rowIndex]
                .trimEnd()
                .split(" ")
                .filter(s => !!s);

            columns.forEach((c, colIndex) => {
                problems[colIndex].add1(parseInt(c));
            });
        }

        this._result.part1 = problems.reduce((acc, curr) => acc + curr.result.part1, 0);

        let currentProblem = 0;
        for (let colIndex = 0; colIndex < max; colIndex++) {
            const cephalopodNumber = trash
                .slice(0, trash.length - 1)
                .map(t => t[colIndex])
                .join("")

            if (cephalopodNumber.trimEnd() === "") {
                currentProblem++;
                continue;
            }

            problems[currentProblem].add2(parseInt(cephalopodNumber));
        }

        this._result.part2 = problems.reduce((acc, curr) => acc + curr.result.part2, 0);

        return this._result;
    }
}

class Problem {
    public operation: string;
    public result: Result;

    constructor(operation: string) {
        this.operation = operation;

        switch (this.operation) {
            case "*":
                this.result = {
                    part1: 1,
                    part2: 1
                }
                break;
            case "+":
                this.result = {
                    part1: 0,
                    part2: 0
                }
                break;
            default:
                throw new Error("Operation not recognized");
        }
    }

    public add1(input: number): number {
        switch (this.operation) {
            case "*":
                this.result.part1 *= input;
                break;
            case "+":
                this.result.part1 += input;
                break;
            default:
                break;
        }

        return this.result.part1;
    }

    // ¯\_(ツ)_/¯ 
    public add2(input: number): number {
        switch (this.operation) {
            case "*":
                this.result.part2 *= input;
                break;
            case "+":
                this.result.part2 += input;
                break;
            default:
                break;
        }

        return this.result.part2;
    }
}
