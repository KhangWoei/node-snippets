import { AugmentedMatrix } from "./augmentedMatrix.js"

export class GaussianEliminationCalculator {
    private constructor() {
    }

    public static toReducedRowEchelonForm(matrix: AugmentedMatrix): void {

        let pivot = {
            row: 0,
            column: 0
        }

        let coefficients = matrix.coefficients;

        for (; pivot.row < coefficients.length && pivot.column < coefficients[0].length; pivot.column++) {
            // Swap if needed
            let rowMax = {
                index: pivot.row,
                value: Math.abs(coefficients[pivot.row][pivot.column])
            }
            for (let row = pivot.row; row < coefficients.length; row++) {
                let current = Math.abs(coefficients[row][pivot.column])
                if (current > rowMax.value) {
                    rowMax = {
                        index: row,
                        value: current
                    }
                }
            }

            if (rowMax.value === 0) {
                continue;
            }

            if (rowMax.index != pivot.row) {
                [coefficients[pivot.row], coefficients[rowMax.index]] = [coefficients[rowMax.index], coefficients[pivot.row]];
            }

            for (let row = pivot.row + 1; row < coefficients.length; row++) {
                const factor = coefficients[row][pivot.column] / coefficients[pivot.row][pivot.column];

                for (let column = 0; column < coefficients[0].length; column++) {
                    matrix.coefficients[row][column] -= matrix.coefficients[pivot.row][column] * factor;
                }

                matrix.augment[row] -= matrix.augment[pivot.row] * factor;
            }


            pivot.row++;
        }

    }
}
