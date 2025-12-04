export type Result = {
    part1: number
    part2: number
}

export class Booster {
    private _result: Result;

    constructor() {
        this._result = {
            part1: 0,
            part2: 0
        }
    }

    public async boostAsync(banks: AsyncIterable<string>): Promise<Result> {
        for await (const bank of banks) {
            this._result.part1 += this.getLargestJoltage(bank);
            this._result.part2 += this.getLargestJoltage2(bank);
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

    public getLargestJoltage2(bank: string): number {
        let result = 0;
        let start = bank.length - 12;
        let end = 0;

        while (start >= end && start < bank.length) {
            let maxIndex = start;

            if (start !== end) {

                for (let current = start - 1; current >= end; current--) {
                    if (parseInt(bank[maxIndex]) <= parseInt(bank[current])) {
                        maxIndex = current;
                    }
                }

            }

            result = (result * 10) + parseInt(bank[maxIndex]);
            end = maxIndex + 1;
            start++;
        }

        return result;
    }
}
