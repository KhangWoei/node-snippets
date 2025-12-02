type Result = {
    part1: number,
    part2: number
}

export class Decoder {
    private _current: number;
    private _result: Result;

    constructor(start: number) {
        this._current = start;
        this._result = {
            part1: 0,
            part2: 0
        }
    }

    public async decodeAsync(commands: AsyncIterable<string>): Promise<Result> {
        for await (const command of commands) {
            this.rotate(command);
        }

        return this._result;
    }

    public decode(commands: Iterable<string>): Result {
        for (const command of commands) {
            this.rotate(command);
        }

        return this._result;
    }

    public rotate(input: string): number {
        if (!input) {
            return this._current;
        }
        const previous = this._current;
        const direction = input[0];
        const clicks = parseInt(input.slice(1));

        const rotations = Math.floor(clicks / 100);
        this._result.part2 += rotations;

        const normalizedClicks = clicks % 100;
        this._current += direction === 'R' ? normalizedClicks : -normalizedClicks;

        if (previous !== 0 && (this._current < 0 || this._current > 100)) {
            this._result.part2++;
        }

        this._current = (this._current + 100) % 100;
        if (this._current === 0) {
            this._result.part1++;
            this._result.part2++;
        }

        return this._current;
    }
}
