export class Decoder {
    private _current: number;
    private _result: number;

    constructor(start: number) {
        this._current = start;
        this._result = 0;
    }

    public async decodeAsync(commands: AsyncIterable<string>): Promise<number> {
        for await (const command of commands) {
            this.rotate(command);
        }

        return this._result;
    }

    public decode(commands: Iterable<string>): number {
        for (const command of commands) {
            this.rotate(command);
        }

        return this._result;
    }

    public rotate(input: string): number {
        if (!input) {
            return this._current;
        }

        const direction = input[0];
        const clicks = parseInt(input.slice(1));

        this._current += direction === 'R' ? clicks : -clicks;
        this._current = (this._current + 100) % 100;

        if (this._current === 0) {
            this._result++;
        }

        return this._current;
    }
}
