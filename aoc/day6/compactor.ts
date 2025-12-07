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
        const problems = trash[trash.length - 1]
            .trimEnd()
            .split(" ")
            .filter(op => !!op)
            .map(op => new Problem(op));

        for (let rowIndex = 0; rowIndex < trash.length - 1; rowIndex++) {
            const columns = trash[rowIndex]
                .trimEnd()
                .split(" ")
                .filter(s => !!s);

            columns.forEach((c, colIndex) => {
                problems[colIndex].add(parseInt(c));
            });
        }

        this._result.part1 = problems.reduce((acc, curr) => acc + curr.result, 0);

        return this._result;
    }
}

class Problem {
    public operation: string;
    public result: number;

    constructor(operation: string) {
        this.operation = operation;

        switch (this.operation) {
            case "*":
                this.result = 1;
                break;
            case "+":
                this.result = 0;
                break;
            default:
                throw new Error("Operation not recognized");
        }
    }

    public add(input: number): number {
        switch (this.operation) {
            case "*":
                this.result *= input;
                break;
            case "+":
                this.result += input;
                break;
            default:
                break;
        }

        return this.result;
    }
}
