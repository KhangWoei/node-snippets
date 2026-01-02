type State = {
    indicators: Array<boolean>;
    depth: number
}

export class Machine {
    public readonly indicators: Array<boolean>;
    public readonly buttons: Array<Array<number>>;
    public readonly joltage: Array<number>;

    constructor(indicators: Array<boolean>, buttons: Array<Array<number>>, joltage: Array<number>) {
        this.indicators = indicators;
        this.buttons = buttons;
        this.joltage = joltage;
    }

    public calculateOptimalConfiguration(): number {
        const queue: Array<State> = [
            {
                indicators: new Array(this.indicators.length).fill(false),
                depth: 0,
            }
        ];
        const visited = new Set<string>();
        visited.add(JSON.stringify(queue[0].indicators));

        while (queue.length > 0) {
            const current = queue.shift()!;

            if (this.sequenceEqual(current.indicators, this.indicators)) {
                return current.depth;
            }

            for (const button of this.buttons) {
                const newIndicators = this.switch(current.indicators, button);
                const key = JSON.stringify(newIndicators);

                if (visited.has(key)) {
                    continue;
                }

                visited.add(key);
                queue.push({
                    indicators: newIndicators,
                    depth: current.depth + 1
                });
            }
        }

        throw new Error("Unable to reach target state");
    }

    private switch(indicators: Array<boolean>, button: Array<number>): Array<boolean> {
        const result = [...indicators];

        for (const indicator of button) {
            result[indicator] = !result[indicator]
        }

        return result;
    }

    private sequenceEqual<T>(left: Array<T>, right: Array<T>): boolean {
        if (left.length != right.length) {
            return false;
        }

        for (let i = 0; i < left.length; i++) {
            if (left[i] !== right[i]) {
                return false;
            }
        }

        return true;
    }
}

