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
            this._result.part1 += this.getLargestJoltage(bank);
        }
        return this._result;
    }

    public getLargestJoltage(bank: string): number {
        let maxJoltage = 0;
        let anchor = parseInt(bank[0]);

        for (let i = 1; i < bank.length; i++) {
            const currentDigit = parseInt(bank[i]);

            if (currentDigit > anchor
                && i !== bank.length - 1) {
                anchor = currentDigit;
                continue;
            }

            const currentPair = (anchor * 10) + currentDigit;
            maxJoltage = Math.max(maxJoltage, currentPair);
        }

        return maxJoltage;
    }
}
