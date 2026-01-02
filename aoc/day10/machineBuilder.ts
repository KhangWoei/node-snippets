import { Machine } from "./machine.js";

enum State {
    Unknown,
    Indicator,
    Button,
    Joltage
}

export class MachineBuilder {
    private readonly _indicators: Array<boolean>;
    private readonly _buttons: Array<Array<number>>;
    private readonly _joltage: Array<number>;

    private static readonly _regex = /(?<indicators>\[.*?\])\s*(?<buttons>\(.*?\)(?:\s*\(.*?\))*)\s*(?<joltage>\{.*?\})/;

    constructor() {
        this._indicators = new Array<boolean>();
        this._buttons = new Array<Array<number>>();
        this._joltage = new Array<number>();
    }

    public AddIndicator(active: boolean): MachineBuilder {
        this._indicators.push(active);
        return this;
    }

    public AddButtons(...buttons: number[]): MachineBuilder {
        this._buttons.push(buttons);
        return this;
    }

    public AddJoltage(joltage: number): MachineBuilder {
        this._joltage.push(joltage);
        return this;
    }

    public Build(): Machine {
        return new Machine(this._indicators, this._buttons, this._joltage);
    }

    public static Parse(input: string): Machine {
        const builder = new MachineBuilder();

        const match = input.match(this._regex);

        if (!match || !match.groups) {
            throw new Error(`Invalid input format: ${match}`);
        }

        const indicators = match.groups["indicators"].slice(1, -1);
        for (const indicator of indicators!) {
            builder.AddIndicator(indicator === "#");
        }

        const buttonGroups = match.groups["buttons"]
            .split(" ")
            .map(b => b.slice(1, -1));
        for (const buttonGroup of buttonGroups!) {
            const buttons = buttonGroup.split(",").map(b => parseInt(b));

            builder.AddButtons(...buttons);
        }

        const joltages = match.groups["joltage"]
            .slice(1, -1)
            .split(",")
            .map(j => parseInt(j));
        for (const joltage of joltages!) {
            builder.AddJoltage(joltage);
        }

        return builder.Build();
    }
}
