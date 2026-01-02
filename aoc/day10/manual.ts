import { MachineBuilder } from "./machineBuilder.js";

export class Manual {
    constructor() {
    }

    public async process(lines: AsyncIterable<string>): Promise<number> {
        let result = 0;

        for await (const line of lines) {
            const machine = MachineBuilder.Parse(line);

            result += machine.calculateOptimalConfiguration();
        }

        return result;
    }
}
