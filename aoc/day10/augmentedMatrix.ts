import { Machine } from "./machine.js";
export class AugmentedMatrix {
    public readonly coefficients: Array<Array<number>>;
    public readonly augment: Array<number>;

    private constructor(coefficients: Array<Array<number>>, augment: Array<number>) {
        this.coefficients = coefficients;
        this.augment = augment;
    }

    public static fromMachine(machine: Machine): AugmentedMatrix {
        const coefficients = Array.from(
            {
                length: machine.indicators.length
            },
            () => Array.from({ length: machine.buttons.length }, () => 0));


        machine.buttons.forEach((button, index) => {
            button.forEach(indicator => {
                coefficients[indicator][index] = 1
            });
        })

        return new AugmentedMatrix(coefficients, Array.from(machine.joltage));
    }

    public updateRow(row: number, operation: (predicate: number) => number): void {
        for (let i = 0; i < this.coefficients[row].length; i++) {
            this.coefficients[row][i] = operation(this.coefficients[row][i]);
        }

        this.augment[row] = operation(this.augment[row]);
    }
}
