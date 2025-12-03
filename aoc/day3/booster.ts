export type Result = {
    part1: number
}

export class Booster {
    private _result: Result;

    constructor() {
        this._result = {
            part1: 0
        }
    }

    public async boostAsync(banks: AsyncIterable<string>): Promise<Result> {
        for await (const bank of banks) {
            this.getLargestJoltage(bank);
        }
        return this._result;
    }

    public getLargestJoltage(bank: string): number {
        return 0;
    }
}
