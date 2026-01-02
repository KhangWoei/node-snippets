import { machine } from "os";

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
        return 0;
    }
}

export class MachineBuilder {
    private readonly _indicators: Array<boolean>;
    private readonly _buttons: Array<Array<number>>;
    private readonly _joltage: Array<number>;

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
}
